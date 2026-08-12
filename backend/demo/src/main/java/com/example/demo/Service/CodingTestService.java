package com.example.demo.Service;

import com.example.demo.dto.coding.*;
import com.example.demo.entity.aptitude.ViolationType;
import com.example.demo.entity.coding.*;
import com.example.demo.exception.AssignmentNotFoundException;
import com.example.demo.exception.CodingSessionNotActiveException;
import com.example.demo.exception.ResumeNotAllowedException;
import com.example.demo.exception.TestAlreadySubmittedException;
import com.example.demo.repository.CodeSubmissionRepository;
import com.example.demo.repository.CodingQuestionRepository;
import com.example.demo.repository.CodingTestAssignmentRepository;
import com.example.demo.repository.CodingTestRepository;
import com.example.demo.repository.TestCaseRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CodingTestService {

    private static final int DEFAULT_DURATION_MINUTES = 60;
    private static final int MIN_RESUME_SECONDS = 60;
    private static final int FALLBACK_RESUME_SECONDS = 300;

    private final CodingTestRepository testRepository;
    private final CodingQuestionRepository questionRepository;
    private final TestCaseRepository testCaseRepository;
    private final CodingTestAssignmentRepository assignmentRepository;
    private final CodeSubmissionRepository submissionRepository;
    private final CodeExecutionService codeExecutionService;
    private final StudentDirectory studentDirectory;

    // =====================================================================
    // PLACEMENT CELL: publish
    // =====================================================================

    @Transactional
    public PublishCodingTestResponse publishTest(PublishCodingTestRequest request, String pcUsername) {
        if (request.getQuestions() == null || request.getQuestions().isEmpty()) {
            throw new IllegalArgumentException("A coding test needs at least one question.");
        }

        String title = (request.getTitle() != null && !request.getTitle().isBlank())
                ? request.getTitle()
                : "Coding Assessment - " + LocalDateTime.now().toLocalDate();
        int duration = request.getDurationMinutes() != null ? request.getDurationMinutes() : DEFAULT_DURATION_MINUTES;

        CodingTest test = testRepository.save(CodingTest.builder()
                .title(title)
                .durationMinutes(duration)
                .createdByUsername(pcUsername)
                .publishedAt(LocalDateTime.now())
                .resultsPublished(false)
                .build());

        int qIdx = 0;
        int totalPoints = 0;
        for (QuestionInput qi : request.getQuestions()) {
            if (qi.getTitle() == null || qi.getTitle().isBlank()) {
                throw new IllegalArgumentException("Every question needs a title.");
            }
            if (qi.getTestCases() == null || qi.getTestCases().isEmpty()) {
                throw new IllegalArgumentException("Question \"" + qi.getTitle() + "\" needs at least one test case.");
            }
            int points = qi.getPoints() != null ? qi.getPoints() : 100;
            CodingQuestion question = questionRepository.save(CodingQuestion.builder()
                    .test(test)
                    .title(qi.getTitle())
                    .description(qi.getDescription() != null ? qi.getDescription() : "")
                    .difficulty(qi.getDifficulty() != null ? qi.getDifficulty() : "MEDIUM")
                    .points(points)
                    .constraintsText(qi.getConstraintsText())
                    .orderIndex(qIdx++)
                    .build());
            totalPoints += points;

            int tcIdx = 0;
            boolean hasSample = false;
            for (TestCaseInput tci : qi.getTestCases()) {
                testCaseRepository.save(TestCase.builder()
                        .question(question)
                        .input(tci.getInput())
                        .expectedOutput(tci.getExpectedOutput())
                        .hidden(tci.isHidden())
                        .orderIndex(tcIdx++)
                        .build());
                if (!tci.isHidden()) hasSample = true;
            }
            if (!hasSample) {
                throw new IllegalArgumentException(
                        "Question \"" + qi.getTitle() + "\" needs at least one visible (non-hidden) sample test case.");
            }
        }

        List<String> students = studentDirectory.findAllStudentUsernames();
        for (String username : students) {
            assignmentRepository.save(CodingTestAssignment.builder()
                    .test(test)
                    .studentUsername(username)
                    .status(CodingAssignmentStatus.ASSIGNED)
                    .totalMarks(totalPoints)
                    .resumeDecision(ResumeDecision.NONE)
                    .resumeCount(0)
                    .build());
        }

        return PublishCodingTestResponse.builder()
                .testId(test.getId())
                .title(test.getTitle())
                .durationMinutes(test.getDurationMinutes())
                .totalQuestions(request.getQuestions().size())
                .studentsAssigned(students.size())
                .build();
    }

    // =====================================================================
    // STUDENT: list assigned tests
    // =====================================================================

    @Transactional(readOnly = true)
    public List<CodingAssignmentSummaryDTO> listAssignmentsForStudent(String username) {
        return assignmentRepository.findByStudentUsernameOrderByIdDesc(username).stream()
                .map(this::toSummaryDTO)
                .collect(Collectors.toList());
    }

    // =====================================================================
    // STUDENT: start / resume
    // =====================================================================

    @Transactional
    public StartCodingTestResponse startTest(Long testId, String username) {
        CodingTestAssignment assignment = getAssignmentOrThrow(testId, username);

        if (assignment.getStatus() == CodingAssignmentStatus.SUBMITTED) {
            throw new TestAlreadySubmittedException("This test has already been submitted. Resuming is not allowed.");
        }

        if (assignment.getStatus() == CodingAssignmentStatus.AUTO_SUBMITTED) {
            if (assignment.getResumeDecision() == ResumeDecision.APPROVED) {
                return resumeApprovedAssignment(assignment);
            }
            String reason = assignment.getResumeDecision() == ResumeDecision.REJECTED
                    ? "The Placement Cell reviewed your proctoring violation and denied your resume request."
                    : "This test was auto-submitted after a proctoring violation. Your resume request is pending review by the Placement Cell.";
            throw new TestAlreadySubmittedException(reason);
        }

        if (assignment.getStatus() == CodingAssignmentStatus.IN_PROGRESS) {
            // A second /start call while already in progress (refresh, reopened tab) is
            // treated as a resume attempt: force-submit whatever was auto-saved and reject.
            finalizeAssignment(assignment, ViolationType.RESUME_ATTEMPT, null);
            throw new ResumeNotAllowedException(
                    "This coding test session was already in progress and cannot be resumed on your own. " +
                            "It has been submitted with your saved code.");
        }

        // ASSIGNED -> fresh start
        LocalDateTime now = LocalDateTime.now();
        assignment.setStatus(CodingAssignmentStatus.IN_PROGRESS);
        assignment.setStartedAt(now);
        assignment.setDeadline(now.plusMinutes(assignment.getTest().getDurationMinutes()));
        assignmentRepository.save(assignment);

        return buildStartResponse(assignment, now, false);
    }

    private StartCodingTestResponse resumeApprovedAssignment(CodingTestAssignment assignment) {
        int remaining = assignment.getRemainingSecondsAtViolation() != null
                ? Math.max(assignment.getRemainingSecondsAtViolation(), MIN_RESUME_SECONDS)
                : FALLBACK_RESUME_SECONDS;
        LocalDateTime now = LocalDateTime.now();
        assignment.setStatus(CodingAssignmentStatus.IN_PROGRESS);
        assignment.setDeadline(now.plusSeconds(remaining));
        assignment.setSubmittedAt(null);
        assignment.setResumeDecision(ResumeDecision.NONE);
        assignment.setResumeCount(assignment.getResumeCount() + 1);
        assignmentRepository.save(assignment);
        return buildStartResponse(assignment, now, true);
    }

    private StartCodingTestResponse buildStartResponse(CodingTestAssignment assignment, LocalDateTime now, boolean resumed) {
        List<CodingQuestion> questions = questionRepository.findByTestIdOrderByOrderIndexAsc(assignment.getTest().getId());
        Map<Long, CodeSubmission> savedByQuestion = submissionRepository.findByAssignmentId(assignment.getId()).stream()
                .collect(Collectors.toMap(cs -> cs.getQuestion().getId(), cs -> cs));

        List<CodingQuestionDTO> questionDTOs = questions.stream()
                .map(q -> CodingQuestionDTO.builder()
                        .id(q.getId())
                        .title(q.getTitle())
                        .description(q.getDescription())
                        .difficulty(q.getDifficulty())
                        .points(q.getPoints())
                        .constraintsText(q.getConstraintsText())
                        .orderIndex(q.getOrderIndex())
                        .sampleTestCases(testCaseRepository.findByQuestionIdAndHiddenFalseOrderByOrderIndexAsc(q.getId())
                                .stream()
                                .map(tc -> TestCaseDTO.builder().input(tc.getInput()).expectedOutput(tc.getExpectedOutput()).build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());

        List<SavedCodeDTO> savedCode = questions.stream()
                .map(q -> savedByQuestion.get(q.getId()))
                .filter(cs -> cs != null && cs.getCode() != null)
                .map(cs -> SavedCodeDTO.builder()
                        .questionId(cs.getQuestion().getId())
                        .language(cs.getLanguage())
                        .code(cs.getCode())
                        .score(cs.getScore())
                        .maxScore(cs.getQuestion().getPoints())
                        .build())
                .collect(Collectors.toList());

        return StartCodingTestResponse.builder()
                .assignmentId(assignment.getId())
                .testId(assignment.getTest().getId())
                .title(assignment.getTest().getTitle())
                .durationMinutes(assignment.getTest().getDurationMinutes())
                .serverTime(now)
                .deadline(assignment.getDeadline())
                .questions(questionDTOs)
                .savedCode(savedCode)
                .resumed(resumed)
                .build();
    }

    // =====================================================================
    // STUDENT: autosave draft code (no scoring)
    // =====================================================================

    @Transactional
    public void autosaveCode(Long testId, String username, Long questionId, String language, String code) {
        CodingTestAssignment assignment = getAssignmentOrThrow(testId, username);
        if (assignment.getStatus() != CodingAssignmentStatus.IN_PROGRESS) return;
        if (LocalDateTime.now().isAfter(assignment.getDeadline())) return;

        CodingQuestion question = questionRepository.findById(questionId).orElse(null);
        if (question == null || !question.getTest().getId().equals(assignment.getTest().getId())) return;

        CodeSubmission cs = submissionRepository.findByAssignmentIdAndQuestionId(assignment.getId(), questionId)
                .orElse(CodeSubmission.builder().assignment(assignment).question(question).build());
        cs.setLanguage(language);
        cs.setCode(code);
        cs.setLastSavedAt(LocalDateTime.now());
        submissionRepository.save(cs);
    }

    // =====================================================================
    // STUDENT: run (sample test cases only, not scored)
    // =====================================================================

    @Transactional
    public RunCodeResponse runCode(Long testId, String username, Long questionId, RunCodeRequest request) {
        CodingTestAssignment assignment = requireActiveSession(testId, username);
        CodingQuestion question = requireQuestion(assignment, questionId);

        List<TestCase> sampleCases = testCaseRepository.findByQuestionIdAndHiddenFalseOrderByOrderIndexAsc(question.getId());
        RunOutcome outcome = runAgainstTestCases(request.getLanguage(), request.getCode(), sampleCases, false);

        autosaveCode(testId, username, questionId, request.getLanguage(), request.getCode());

        return RunCodeResponse.builder()
                .allPassed(!sampleCases.isEmpty() && outcome.getPassedCount() == sampleCases.size())
                .results(outcome.getResults())
                .build();
    }

    // =====================================================================
    // STUDENT: submit a single question (all test cases, scored)
    // =====================================================================

    @Transactional
    public SubmitQuestionResponse submitQuestion(Long testId, String username, Long questionId, RunCodeRequest request) {
        CodingTestAssignment assignment = requireActiveSession(testId, username);
        CodingQuestion question = requireQuestion(assignment, questionId);

        List<TestCase> allCases = testCaseRepository.findByQuestionIdOrderByOrderIndexAsc(question.getId());
        RunOutcome outcome = runAgainstTestCases(request.getLanguage(), request.getCode(), allCases, true);

        int total = allCases.size();
        int score = total == 0 ? 0 : (int) Math.round(question.getPoints() * (outcome.getPassedCount() / (double) total));

        CodeSubmission cs = submissionRepository.findByAssignmentIdAndQuestionId(assignment.getId(), question.getId())
                .orElse(CodeSubmission.builder().assignment(assignment).question(question).build());
        cs.setLanguage(request.getLanguage());
        cs.setCode(request.getCode());
        cs.setPassedCount(outcome.getPassedCount());
        cs.setTotalCount(total);
        cs.setScore(score);
        LocalDateTime now = LocalDateTime.now();
        cs.setLastSavedAt(now);
        cs.setLastSubmittedAt(now);
        submissionRepository.save(cs);

        return SubmitQuestionResponse.builder()
                .questionId(question.getId())
                .passedCount(outcome.getPassedCount())
                .totalCount(total)
                .score(score)
                .maxScore(question.getPoints())
                .results(outcome.getResults())
                .build();
    }

    // =====================================================================
    // STUDENT: violation (tab switch / fullscreen exit / window blur) + screenshot
    // =====================================================================

    @Transactional
    public CodingTestResultResponse reportViolation(Long testId, String username, CodingViolationRequest request) {
        CodingTestAssignment assignment = getAssignmentOrThrow(testId, username);
        if (assignment.getStatus() != CodingAssignmentStatus.IN_PROGRESS) {
            return toResultResponse(assignment); // already finalized, just return current state
        }

        int remaining = (int) Math.max(0, Duration.between(LocalDateTime.now(), assignment.getDeadline()).getSeconds());
        assignment.setViolationOccurredAt(LocalDateTime.now());
        assignment.setViolationScreenshot(request.getScreenshotBase64());
        assignment.setRemainingSecondsAtViolation(remaining);
        assignment.setResumeDecision(ResumeDecision.PENDING);

        ViolationType type = request.getType() != null ? request.getType() : ViolationType.TAB_SWITCH;
        finalizeAssignment(assignment, type, request.getPendingCode());

        return toResultResponse(assignment);
    }

    // =====================================================================
    // STUDENT: final submit
    // =====================================================================

    @Transactional
    public CodingTestResultResponse submitTest(Long testId, String username, SubmitCodingTestRequest request) {
        CodingTestAssignment assignment = getAssignmentOrThrow(testId, username);

        if (assignment.getStatus() == CodingAssignmentStatus.SUBMITTED
                || assignment.getStatus() == CodingAssignmentStatus.AUTO_SUBMITTED) {
            return toResultResponse(assignment); // idempotent
        }

        boolean timeExpired = LocalDateTime.now().isAfter(assignment.getDeadline());
        finalizeAssignment(assignment, timeExpired ? ViolationType.TIME_EXPIRED : null,
                request != null ? request.getPendingCode() : null);

        return toResultResponse(assignment);
    }

    // =====================================================================
    // STUDENT: fetch result
    // =====================================================================

    @Transactional(readOnly = true)
    public CodingTestResultResponse getResult(Long testId, String username) {
        CodingTestAssignment assignment = getAssignmentOrThrow(testId, username);
        if (assignment.getStatus() != CodingAssignmentStatus.SUBMITTED
                && assignment.getStatus() != CodingAssignmentStatus.AUTO_SUBMITTED) {
            throw new AssignmentNotFoundException("Test has not been submitted yet.");
        }
        return toResultResponse(assignment);
    }

    @Transactional(readOnly = true)
    public List<CodingTestSummaryDTO> listAllTests() {
        List<CodingTest> tests = testRepository.findAll();
        tests.sort((a, b) -> {
            LocalDateTime pa = a.getPublishedAt();
            LocalDateTime pb = b.getPublishedAt();
            if (pa == null && pb == null) return 0;
            if (pa == null) return 1;
            if (pb == null) return -1;
            return pb.compareTo(pa); // newest first
        });

        return tests.stream().map(test -> {
            List<CodingTestAssignment> assignments = assignmentRepository.findByTestId(test.getId());
            int submitted = 0;
            int inProgress = 0;
            int pendingViolations = 0;
            for (CodingTestAssignment a : assignments) {
                if (a.getStatus() == CodingAssignmentStatus.SUBMITTED || a.getStatus() == CodingAssignmentStatus.AUTO_SUBMITTED) {
                    submitted++;
                } else if (a.getStatus() == CodingAssignmentStatus.IN_PROGRESS) {
                    inProgress++;
                }
                if (a.getResumeDecision() == ResumeDecision.PENDING) {
                    pendingViolations++;
                }
            }
            return CodingTestSummaryDTO.builder()
                    .testId(test.getId())
                    .title(test.getTitle())
                    .durationMinutes(test.getDurationMinutes())
                    .publishedAt(test.getPublishedAt())
                    .resultsPublished(test.isResultsPublished())
                    .totalQuestions(questionRepository.findByTestIdOrderByOrderIndexAsc(test.getId()).size())
                    .totalStudents(assignments.size())
                    .submittedCount(submitted)
                    .inProgressCount(inProgress)
                    .pendingViolationCount(pendingViolations)
                    .build();
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CodingQuestionAdminDTO> listQuestionsForTest(Long testId) {
        // 404s naturally if the test doesn't exist -- confirm it does first for a clean error.
        testRepository.findById(testId)
                .orElseThrow(() -> new AssignmentNotFoundException("No such coding test: " + testId));

        return questionRepository.findByTestIdOrderByOrderIndexAsc(testId).stream()
                .map(q -> CodingQuestionAdminDTO.builder()
                        .id(q.getId())
                        .title(q.getTitle())
                        .description(q.getDescription())
                        .difficulty(q.getDifficulty())
                        .points(q.getPoints())
                        .constraintsText(q.getConstraintsText())
                        .orderIndex(q.getOrderIndex())
                        .testCases(testCaseRepository.findByQuestionIdOrderByOrderIndexAsc(q.getId()).stream()
                                .map(tc -> TestCaseAdminDTO.builder()
                                        .input(tc.getInput())
                                        .expectedOutput(tc.getExpectedOutput())
                                        .hidden(tc.isHidden())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }

    // =====================================================================
    // PLACEMENT CELL: proctoring review
    // =====================================================================

    @Transactional(readOnly = true)
    public List<PendingResumeRequestDTO> listPendingResumeRequests(Long testId) {
        List<CodingTestAssignment> pending = testId != null
                ? assignmentRepository.findByTestIdAndResumeDecision(testId, ResumeDecision.PENDING)
                : assignmentRepository.findByResumeDecision(ResumeDecision.PENDING);
        return pending.stream().map(this::toPendingDTO).collect(Collectors.toList());
    }

    @Transactional
    public PendingResumeRequestDTO decideResume(Long assignmentId, boolean approve, String pcUsername) {
        CodingTestAssignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new AssignmentNotFoundException("No such assignment: " + assignmentId));

        if (assignment.getResumeDecision() != ResumeDecision.PENDING) {
            throw new IllegalStateException("This resume request has already been decided.");
        }

        assignment.setResumeDecision(approve ? ResumeDecision.APPROVED : ResumeDecision.REJECTED);
        assignment.setResumeDecidedByUsername(pcUsername);
        assignment.setResumeDecidedAt(LocalDateTime.now());
        assignmentRepository.save(assignment);
        return toPendingDTO(assignment);
    }

    @Transactional(readOnly = true)
    public List<CodingResultsListItemDTO> listResults(Long testId) {
        return assignmentRepository.findByTestId(testId).stream()
                .map(a -> CodingResultsListItemDTO.builder()
                        .assignmentId(a.getId())
                        .studentUsername(a.getStudentUsername())
                        .status(a.getStatus())
                        .score(a.getScore())
                        .totalMarks(a.getTotalMarks())
                        .submittedAt(a.getSubmittedAt())
                        .violationType(a.getViolationType())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void setResultsPublished(Long testId, boolean publish) {
        CodingTest test = testRepository.findById(testId)
                .orElseThrow(() -> new AssignmentNotFoundException("No such coding test: " + testId));
        test.setResultsPublished(publish);
        testRepository.save(test);
    }

    // =====================================================================
    // internals
    // =====================================================================

    private CodingTestAssignment getAssignmentOrThrow(Long testId, String username) {
        return assignmentRepository.findByTestIdAndStudentUsername(testId, username)
                .orElseThrow(() -> new AssignmentNotFoundException("No coding test assigned to you with id " + testId));
    }

    private CodingTestAssignment requireActiveSession(Long testId, String username) {
        CodingTestAssignment assignment = getAssignmentOrThrow(testId, username);
        if (assignment.getStatus() != CodingAssignmentStatus.IN_PROGRESS) {
            throw new CodingSessionNotActiveException("This test session is not currently active.");
        }
        if (LocalDateTime.now().isAfter(assignment.getDeadline())) {
            throw new CodingSessionNotActiveException("Time is up for this test.");
        }
        return assignment;
    }

    private CodingQuestion requireQuestion(CodingTestAssignment assignment, Long questionId) {
        CodingQuestion question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("No such question: " + questionId));
        if (!question.getTest().getId().equals(assignment.getTest().getId())) {
            throw new IllegalArgumentException("That question does not belong to this test.");
        }
        return question;
    }

    private RunOutcome runAgainstTestCases(String language, String code, List<TestCase> cases, boolean maskHidden) {
        List<TestCaseRunResult> results = new ArrayList<>();
        int passed = 0;

        if (!CodeExecutionService.isSupported(language)) {
            for (TestCase tc : cases) {
                boolean hide = maskHidden && tc.isHidden();
                results.add(TestCaseRunResult.builder()
                        .hidden(tc.isHidden())
                        .input(hide ? null : tc.getInput())
                        .expectedOutput(hide ? null : tc.getExpectedOutput())
                        .actualOutput(null)
                        .passed(false)
                        .errorMessage("Unsupported language: " + language)
                        .build());
            }
            return new RunOutcome(results, 0);
        }

        for (TestCase tc : cases) {
            CodeExecutionService.ExecutionResult exec = codeExecutionService.execute(language, code, tc.getInput());
            boolean passedTc = exec.isSuccess() && CodeExecutionService.outputsMatch(tc.getExpectedOutput(), exec.getStdout());
            if (passedTc) passed++;

            boolean hide = maskHidden && tc.isHidden();
            String error = exec.getErrorMessage() != null
                    ? exec.getErrorMessage()
                    : (exec.getStderr() != null && !exec.getStderr().isBlank() ? exec.getStderr() : null);

            results.add(TestCaseRunResult.builder()
                    .hidden(tc.isHidden())
                    .input(hide ? null : tc.getInput())
                    .expectedOutput(hide ? null : tc.getExpectedOutput())
                    .actualOutput(hide ? null : exec.getStdout())
                    .passed(passedTc)
                    .errorMessage(hide ? null : error)
                    .build());
        }
        return new RunOutcome(results, passed);
    }

    /** Runs (or reuses already-scored) code for every question in the test and
     * finalizes the assignment. Used by final submit, violation auto-submit,
     * and forced resume-attempt submit alike. */
    private void finalizeAssignment(CodingTestAssignment assignment, ViolationType violationType,
                                    List<PendingCodeSubmission> pendingCode) {
        List<CodingQuestion> questions = questionRepository.findByTestIdOrderByOrderIndexAsc(assignment.getTest().getId());
        Map<Long, PendingCodeSubmission> pendingByQuestion = pendingCode == null ? Map.of() : pendingCode.stream()
                .filter(p -> p.getQuestionId() != null)
                .collect(Collectors.toMap(PendingCodeSubmission::getQuestionId, p -> p, (a, b) -> b));

        int totalScore = 0;
        for (CodingQuestion q : questions) {
            CodeSubmission existing = submissionRepository.findByAssignmentIdAndQuestionId(assignment.getId(), q.getId())
                    .orElse(null);

            if (existing != null && existing.getPassedCount() != null) {
                // Already explicitly submitted via submitQuestion(); keep that score.
                totalScore += existing.getScore() == null ? 0 : existing.getScore();
                continue;
            }

            String language = null;
            String code = null;
            PendingCodeSubmission pc = pendingByQuestion.get(q.getId());
            if (pc != null && pc.getCode() != null && !pc.getCode().isBlank()) {
                language = pc.getLanguage();
                code = pc.getCode();
            } else if (existing != null && existing.getCode() != null && !existing.getCode().isBlank()) {
                language = existing.getLanguage();
                code = existing.getCode();
            }

            if (code == null || language == null || !CodeExecutionService.isSupported(language)) {
                continue; // nothing written for this question -> 0 points
            }

            List<TestCase> allCases = testCaseRepository.findByQuestionIdOrderByOrderIndexAsc(q.getId());
            RunOutcome outcome = runAgainstTestCases(language, code, allCases, true);
            int total = allCases.size();
            int score = total == 0 ? 0 : (int) Math.round(q.getPoints() * (outcome.getPassedCount() / (double) total));

            CodeSubmission cs = existing != null ? existing
                    : CodeSubmission.builder().assignment(assignment).question(q).build();
            cs.setLanguage(language);
            cs.setCode(code);
            cs.setPassedCount(outcome.getPassedCount());
            cs.setTotalCount(total);
            cs.setScore(score);
            LocalDateTime now = LocalDateTime.now();
            cs.setLastSavedAt(now);
            cs.setLastSubmittedAt(now);
            submissionRepository.save(cs);

            totalScore += score;
        }

        assignment.setScore(totalScore);
        assignment.setSubmittedAt(LocalDateTime.now());
        assignment.setViolationType(violationType);
        assignment.setStatus(violationType == null ? CodingAssignmentStatus.SUBMITTED : CodingAssignmentStatus.AUTO_SUBMITTED);
        assignmentRepository.save(assignment);
    }

    private CodingTestResultResponse toResultResponse(CodingTestAssignment assignment) {
        boolean published = assignment.getTest().isResultsPublished();
        Integer score = null;
        Integer totalMarks = null;
        Double percentage = null;
        List<QuestionResultDTO> questionResults = null;

        if (published) {
            score = assignment.getScore();
            totalMarks = assignment.getTotalMarks();
            percentage = (totalMarks != null && totalMarks > 0 && score != null)
                    ? Math.round((score * 10000.0) / totalMarks) / 100.0
                    : 0.0;

            List<CodingQuestion> questions = questionRepository.findByTestIdOrderByOrderIndexAsc(assignment.getTest().getId());
            Map<Long, CodeSubmission> byQuestion = submissionRepository.findByAssignmentId(assignment.getId()).stream()
                    .collect(Collectors.toMap(cs -> cs.getQuestion().getId(), cs -> cs));

            questionResults = questions.stream()
                    .map(q -> {
                        CodeSubmission cs = byQuestion.get(q.getId());
                        return QuestionResultDTO.builder()
                                .questionId(q.getId())
                                .title(q.getTitle())
                                .passedCount(cs != null && cs.getPassedCount() != null ? cs.getPassedCount() : 0)
                                .totalCount(cs != null && cs.getTotalCount() != null ? cs.getTotalCount()
                                        : testCaseRepository.findByQuestionIdOrderByOrderIndexAsc(q.getId()).size())
                                .score(cs != null && cs.getScore() != null ? cs.getScore() : 0)
                                .maxScore(q.getPoints())
                                .build();
                    })
                    .collect(Collectors.toList());
        }

        return CodingTestResultResponse.builder()
                .assignmentId(assignment.getId())
                .testId(assignment.getTest().getId())
                .title(assignment.getTest().getTitle())
                .status(assignment.getStatus())
                .resultsPublished(published)
                .score(score)
                .totalMarks(totalMarks)
                .percentage(percentage)
                .questionResults(questionResults)
                .submittedAt(assignment.getSubmittedAt())
                .violationType(assignment.getViolationType())
                .resumeDecision(assignment.getResumeDecision())
                .build();
    }

    private CodingAssignmentSummaryDTO toSummaryDTO(CodingTestAssignment a) {
        boolean published = a.getTest().isResultsPublished();
        boolean terminal = a.getStatus() == CodingAssignmentStatus.SUBMITTED || a.getStatus() == CodingAssignmentStatus.AUTO_SUBMITTED;
        return CodingAssignmentSummaryDTO.builder()
                .assignmentId(a.getId())
                .testId(a.getTest().getId())
                .title(a.getTest().getTitle())
                .durationMinutes(a.getTest().getDurationMinutes())
                .totalQuestions(questionRepository.findByTestIdOrderByOrderIndexAsc(a.getTest().getId()).size())
                .status(a.getStatus())
                .score(published && terminal ? a.getScore() : null)
                .totalMarks(published && terminal ? a.getTotalMarks() : null)
                .resultsPublished(published)
                .resumeDecision(a.getResumeDecision())
                .build();
    }

    private PendingResumeRequestDTO toPendingDTO(CodingTestAssignment a) {
        return PendingResumeRequestDTO.builder()
                .assignmentId(a.getId())
                .testId(a.getTest().getId())
                .testTitle(a.getTest().getTitle())
                .studentUsername(a.getStudentUsername())
                .violationType(a.getViolationType())
                .violationOccurredAt(a.getViolationOccurredAt())
                .screenshotBase64(a.getViolationScreenshot())
                .remainingSecondsAtViolation(a.getRemainingSecondsAtViolation())
                .resumeDecision(a.getResumeDecision())
                .resumeCount(a.getResumeCount())
                .build();
    }

    @Getter
    @AllArgsConstructor
    private static class RunOutcome {
        private final List<TestCaseRunResult> results;
        private final int passedCount;
    }
}


//package com.example.demo.Service;
//
//import com.example.demo.dto.coding.*;
//import com.example.demo.entity.aptitude.ViolationType;
//import com.example.demo.entity.coding.*;
//import com.example.demo.exception.AssignmentNotFoundException;
//import com.example.demo.exception.CodingSessionNotActiveException;
//import com.example.demo.exception.ResumeNotAllowedException;
//import com.example.demo.exception.TestAlreadySubmittedException;
//import com.example.demo.repository.CodeSubmissionRepository;
//import com.example.demo.repository.CodingQuestionRepository;
//import com.example.demo.repository.CodingTestAssignmentRepository;
//import com.example.demo.repository.CodingTestRepository;
//import com.example.demo.repository.TestCaseRepository;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.Duration;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class CodingTestService {
//
//    private static final int DEFAULT_DURATION_MINUTES = 60;
//    private static final int MIN_RESUME_SECONDS = 60;
//    private static final int FALLBACK_RESUME_SECONDS = 300;
//
//    private final CodingTestRepository testRepository;
//    private final CodingQuestionRepository questionRepository;
//    private final TestCaseRepository testCaseRepository;
//    private final CodingTestAssignmentRepository assignmentRepository;
//    private final CodeSubmissionRepository submissionRepository;
//    private final CodeExecutionService codeExecutionService;
//    private final StudentDirectory studentDirectory;
//
//    // =====================================================================
//    // PLACEMENT CELL: publish
//    // =====================================================================
//
//    @Transactional
//    public PublishCodingTestResponse publishTest(PublishCodingTestRequest request, String pcUsername) {
//        if (request.getQuestions() == null || request.getQuestions().isEmpty()) {
//            throw new IllegalArgumentException("A coding test needs at least one question.");
//        }
//
//        String title = (request.getTitle() != null && !request.getTitle().isBlank())
//                ? request.getTitle()
//                : "Coding Assessment - " + LocalDateTime.now().toLocalDate();
//        int duration = request.getDurationMinutes() != null ? request.getDurationMinutes() : DEFAULT_DURATION_MINUTES;
//
//        CodingTest test = testRepository.save(CodingTest.builder()
//                .title(title)
//                .durationMinutes(duration)
//                .createdByUsername(pcUsername)
//                .publishedAt(LocalDateTime.now())
//                .resultsPublished(false)
//                .build());
//
//        int qIdx = 0;
//        int totalPoints = 0;
//        for (QuestionInput qi : request.getQuestions()) {
//            if (qi.getTitle() == null || qi.getTitle().isBlank()) {
//                throw new IllegalArgumentException("Every question needs a title.");
//            }
//            if (qi.getTestCases() == null || qi.getTestCases().isEmpty()) {
//                throw new IllegalArgumentException("Question \"" + qi.getTitle() + "\" needs at least one test case.");
//            }
//            int points = qi.getPoints() != null ? qi.getPoints() : 100;
//            CodingQuestion question = questionRepository.save(CodingQuestion.builder()
//                    .test(test)
//                    .title(qi.getTitle())
//                    .description(qi.getDescription() != null ? qi.getDescription() : "")
//                    .difficulty(qi.getDifficulty() != null ? qi.getDifficulty() : "MEDIUM")
//                    .points(points)
//                    .constraintsText(qi.getConstraintsText())
//                    .orderIndex(qIdx++)
//                    .build());
//            totalPoints += points;
//
//            int tcIdx = 0;
//            boolean hasSample = false;
//            for (TestCaseInput tci : qi.getTestCases()) {
//                testCaseRepository.save(TestCase.builder()
//                        .question(question)
//                        .input(tci.getInput())
//                        .expectedOutput(tci.getExpectedOutput())
//                        .hidden(tci.isHidden())
//                        .orderIndex(tcIdx++)
//                        .build());
//                if (!tci.isHidden()) hasSample = true;
//            }
//            if (!hasSample) {
//                throw new IllegalArgumentException(
//                        "Question \"" + qi.getTitle() + "\" needs at least one visible (non-hidden) sample test case.");
//            }
//        }
//
//        List<String> students = studentDirectory.findAllStudentUsernames();
//        for (String username : students) {
//            assignmentRepository.save(CodingTestAssignment.builder()
//                    .test(test)
//                    .studentUsername(username)
//                    .status(CodingAssignmentStatus.ASSIGNED)
//                    .totalMarks(totalPoints)
//                    .resumeDecision(ResumeDecision.NONE)
//                    .resumeCount(0)
//                    .build());
//        }
//
//        return PublishCodingTestResponse.builder()
//                .testId(test.getId())
//                .title(test.getTitle())
//                .durationMinutes(test.getDurationMinutes())
//                .totalQuestions(request.getQuestions().size())
//                .studentsAssigned(students.size())
//                .build();
//    }
//
//    // =====================================================================
//    // STUDENT: list assigned tests
//    // =====================================================================
//
//    @Transactional(readOnly = true)
//    public List<CodingAssignmentSummaryDTO> listAssignmentsForStudent(String username) {
//        return assignmentRepository.findByStudentUsernameOrderByIdDesc(username).stream()
//                .map(this::toSummaryDTO)
//                .collect(Collectors.toList());
//    }
//
//    // =====================================================================
//    // STUDENT: start / resume
//    // =====================================================================
//
//    @Transactional
//    public StartCodingTestResponse startTest(Long testId, String username) {
//        CodingTestAssignment assignment = getAssignmentOrThrow(testId, username);
//
//        if (assignment.getStatus() == CodingAssignmentStatus.SUBMITTED) {
//            throw new TestAlreadySubmittedException("This test has already been submitted. Resuming is not allowed.");
//        }
//
//        if (assignment.getStatus() == CodingAssignmentStatus.AUTO_SUBMITTED) {
//            if (assignment.getResumeDecision() == ResumeDecision.APPROVED) {
//                return resumeApprovedAssignment(assignment);
//            }
//            String reason = assignment.getResumeDecision() == ResumeDecision.REJECTED
//                    ? "The Placement Cell reviewed your proctoring violation and denied your resume request."
//                    : "This test was auto-submitted after a proctoring violation. Your resume request is pending review by the Placement Cell.";
//            throw new TestAlreadySubmittedException(reason);
//        }
//
//        if (assignment.getStatus() == CodingAssignmentStatus.IN_PROGRESS) {
//            // A second /start call while already in progress (refresh, reopened tab) is
//            // treated as a resume attempt: force-submit whatever was auto-saved and reject.
//            finalizeAssignment(assignment, ViolationType.RESUME_ATTEMPT, null);
//            throw new ResumeNotAllowedException(
//                    "This coding test session was already in progress and cannot be resumed on your own. " +
//                    "It has been submitted with your saved code.");
//        }
//
//        // ASSIGNED -> fresh start
//        LocalDateTime now = LocalDateTime.now();
//        assignment.setStatus(CodingAssignmentStatus.IN_PROGRESS);
//        assignment.setStartedAt(now);
//        assignment.setDeadline(now.plusMinutes(assignment.getTest().getDurationMinutes()));
//        assignmentRepository.save(assignment);
//
//        return buildStartResponse(assignment, now, false);
//    }
//
//    private StartCodingTestResponse resumeApprovedAssignment(CodingTestAssignment assignment) {
//        int remaining = assignment.getRemainingSecondsAtViolation() != null
//                ? Math.max(assignment.getRemainingSecondsAtViolation(), MIN_RESUME_SECONDS)
//                : FALLBACK_RESUME_SECONDS;
//        LocalDateTime now = LocalDateTime.now();
//        assignment.setStatus(CodingAssignmentStatus.IN_PROGRESS);
//        assignment.setDeadline(now.plusSeconds(remaining));
//        assignment.setSubmittedAt(null);
//        assignment.setResumeDecision(ResumeDecision.NONE);
//        assignment.setResumeCount(assignment.getResumeCount() + 1);
//        assignmentRepository.save(assignment);
//        return buildStartResponse(assignment, now, true);
//    }
//
//    private StartCodingTestResponse buildStartResponse(CodingTestAssignment assignment, LocalDateTime now, boolean resumed) {
//        List<CodingQuestion> questions = questionRepository.findByTestIdOrderByOrderIndexAsc(assignment.getTest().getId());
//        Map<Long, CodeSubmission> savedByQuestion = submissionRepository.findByAssignmentId(assignment.getId()).stream()
//                .collect(Collectors.toMap(cs -> cs.getQuestion().getId(), cs -> cs));
//
//        List<CodingQuestionDTO> questionDTOs = questions.stream()
//                .map(q -> CodingQuestionDTO.builder()
//                        .id(q.getId())
//                        .title(q.getTitle())
//                        .description(q.getDescription())
//                        .difficulty(q.getDifficulty())
//                        .points(q.getPoints())
//                        .constraintsText(q.getConstraintsText())
//                        .orderIndex(q.getOrderIndex())
//                        .sampleTestCases(testCaseRepository.findByQuestionIdAndHiddenFalseOrderByOrderIndexAsc(q.getId())
//                                .stream()
//                                .map(tc -> TestCaseDTO.builder().input(tc.getInput()).expectedOutput(tc.getExpectedOutput()).build())
//                                .collect(Collectors.toList()))
//                        .build())
//                .collect(Collectors.toList());
//
//        List<SavedCodeDTO> savedCode = questions.stream()
//                .map(q -> savedByQuestion.get(q.getId()))
//                .filter(cs -> cs != null && cs.getCode() != null)
//                .map(cs -> SavedCodeDTO.builder()
//                        .questionId(cs.getQuestion().getId())
//                        .language(cs.getLanguage())
//                        .code(cs.getCode())
//                        .score(cs.getScore())
//                        .maxScore(cs.getQuestion().getPoints())
//                        .build())
//                .collect(Collectors.toList());
//
//        return StartCodingTestResponse.builder()
//                .assignmentId(assignment.getId())
//                .testId(assignment.getTest().getId())
//                .title(assignment.getTest().getTitle())
//                .durationMinutes(assignment.getTest().getDurationMinutes())
//                .serverTime(now)
//                .deadline(assignment.getDeadline())
//                .questions(questionDTOs)
//                .savedCode(savedCode)
//                .resumed(resumed)
//                .build();
//    }
//
//    // =====================================================================
//    // STUDENT: autosave draft code (no scoring)
//    // =====================================================================
//
//    @Transactional
//    public void autosaveCode(Long testId, String username, Long questionId, String language, String code) {
//        CodingTestAssignment assignment = getAssignmentOrThrow(testId, username);
//        if (assignment.getStatus() != CodingAssignmentStatus.IN_PROGRESS) return;
//        if (LocalDateTime.now().isAfter(assignment.getDeadline())) return;
//
//        CodingQuestion question = questionRepository.findById(questionId).orElse(null);
//        if (question == null || !question.getTest().getId().equals(assignment.getTest().getId())) return;
//
//        CodeSubmission cs = submissionRepository.findByAssignmentIdAndQuestionId(assignment.getId(), questionId)
//                .orElse(CodeSubmission.builder().assignment(assignment).question(question).build());
//        cs.setLanguage(language);
//        cs.setCode(code);
//        cs.setLastSavedAt(LocalDateTime.now());
//        submissionRepository.save(cs);
//    }
//
//    // =====================================================================
//    // STUDENT: run (sample test cases only, not scored)
//    // =====================================================================
//
//    @Transactional
//    public RunCodeResponse runCode(Long testId, String username, Long questionId, RunCodeRequest request) {
//        CodingTestAssignment assignment = requireActiveSession(testId, username);
//        CodingQuestion question = requireQuestion(assignment, questionId);
//
//        List<TestCase> sampleCases = testCaseRepository.findByQuestionIdAndHiddenFalseOrderByOrderIndexAsc(question.getId());
//        RunOutcome outcome = runAgainstTestCases(request.getLanguage(), request.getCode(), sampleCases, false);
//
//        autosaveCode(testId, username, questionId, request.getLanguage(), request.getCode());
//
//        return RunCodeResponse.builder()
//                .allPassed(!sampleCases.isEmpty() && outcome.getPassedCount() == sampleCases.size())
//                .results(outcome.getResults())
//                .build();
//    }
//
//    // =====================================================================
//    // STUDENT: submit a single question (all test cases, scored)
//    // =====================================================================
//
//    @Transactional
//    public SubmitQuestionResponse submitQuestion(Long testId, String username, Long questionId, RunCodeRequest request) {
//        CodingTestAssignment assignment = requireActiveSession(testId, username);
//        CodingQuestion question = requireQuestion(assignment, questionId);
//
//        List<TestCase> allCases = testCaseRepository.findByQuestionIdOrderByOrderIndexAsc(question.getId());
//        RunOutcome outcome = runAgainstTestCases(request.getLanguage(), request.getCode(), allCases, true);
//
//        int total = allCases.size();
//        int score = total == 0 ? 0 : (int) Math.round(question.getPoints() * (outcome.getPassedCount() / (double) total));
//
//        CodeSubmission cs = submissionRepository.findByAssignmentIdAndQuestionId(assignment.getId(), question.getId())
//                .orElse(CodeSubmission.builder().assignment(assignment).question(question).build());
//        cs.setLanguage(request.getLanguage());
//        cs.setCode(request.getCode());
//        cs.setPassedCount(outcome.getPassedCount());
//        cs.setTotalCount(total);
//        cs.setScore(score);
//        LocalDateTime now = LocalDateTime.now();
//        cs.setLastSavedAt(now);
//        cs.setLastSubmittedAt(now);
//        submissionRepository.save(cs);
//
//        return SubmitQuestionResponse.builder()
//                .questionId(question.getId())
//                .passedCount(outcome.getPassedCount())
//                .totalCount(total)
//                .score(score)
//                .maxScore(question.getPoints())
//                .results(outcome.getResults())
//                .build();
//    }
//
//    // =====================================================================
//    // STUDENT: violation (tab switch / fullscreen exit / window blur) + screenshot
//    // =====================================================================
//
//    @Transactional
//    public CodingTestResultResponse reportViolation(Long testId, String username, CodingViolationRequest request) {
//        CodingTestAssignment assignment = getAssignmentOrThrow(testId, username);
//        if (assignment.getStatus() != CodingAssignmentStatus.IN_PROGRESS) {
//            return toResultResponse(assignment); // already finalized, just return current state
//        }
//
//        int remaining = (int) Math.max(0, Duration.between(LocalDateTime.now(), assignment.getDeadline()).getSeconds());
//        assignment.setViolationOccurredAt(LocalDateTime.now());
//        assignment.setViolationScreenshot(request.getScreenshotBase64());
//        assignment.setRemainingSecondsAtViolation(remaining);
//        assignment.setResumeDecision(ResumeDecision.PENDING);
//
//        ViolationType type = request.getType() != null ? request.getType() : ViolationType.TAB_SWITCH;
//        finalizeAssignment(assignment, type, request.getPendingCode());
//
//        return toResultResponse(assignment);
//    }
//
//    // =====================================================================
//    // STUDENT: final submit
//    // =====================================================================
//
//    @Transactional
//    public CodingTestResultResponse submitTest(Long testId, String username, SubmitCodingTestRequest request) {
//        CodingTestAssignment assignment = getAssignmentOrThrow(testId, username);
//
//        if (assignment.getStatus() == CodingAssignmentStatus.SUBMITTED
//                || assignment.getStatus() == CodingAssignmentStatus.AUTO_SUBMITTED) {
//            return toResultResponse(assignment); // idempotent
//        }
//
//        boolean timeExpired = LocalDateTime.now().isAfter(assignment.getDeadline());
//        finalizeAssignment(assignment, timeExpired ? ViolationType.TIME_EXPIRED : null,
//                request != null ? request.getPendingCode() : null);
//
//        return toResultResponse(assignment);
//    }
//
//    // =====================================================================
//    // STUDENT: fetch result
//    // =====================================================================
//
//    @Transactional(readOnly = true)
//    public CodingTestResultResponse getResult(Long testId, String username) {
//        CodingTestAssignment assignment = getAssignmentOrThrow(testId, username);
//        if (assignment.getStatus() != CodingAssignmentStatus.SUBMITTED
//                && assignment.getStatus() != CodingAssignmentStatus.AUTO_SUBMITTED) {
//            throw new AssignmentNotFoundException("Test has not been submitted yet.");
//        }
//        return toResultResponse(assignment);
//    }
//
//    // =====================================================================
//    // PLACEMENT CELL: proctoring review
//    // =====================================================================
//
//    @Transactional(readOnly = true)
//    public List<PendingResumeRequestDTO> listPendingResumeRequests(Long testId) {
//        List<CodingTestAssignment> pending = testId != null
//                ? assignmentRepository.findByTestIdAndResumeDecision(testId, ResumeDecision.PENDING)
//                : assignmentRepository.findByResumeDecision(ResumeDecision.PENDING);
//        return pending.stream().map(this::toPendingDTO).collect(Collectors.toList());
//    }
//
//    @Transactional
//    public PendingResumeRequestDTO decideResume(Long assignmentId, boolean approve, String pcUsername) {
//        CodingTestAssignment assignment = assignmentRepository.findById(assignmentId)
//                .orElseThrow(() -> new AssignmentNotFoundException("No such assignment: " + assignmentId));
//
//        if (assignment.getResumeDecision() != ResumeDecision.PENDING) {
//            throw new IllegalStateException("This resume request has already been decided.");
//        }
//
//        assignment.setResumeDecision(approve ? ResumeDecision.APPROVED : ResumeDecision.REJECTED);
//        assignment.setResumeDecidedByUsername(pcUsername);
//        assignment.setResumeDecidedAt(LocalDateTime.now());
//        assignmentRepository.save(assignment);
//        return toPendingDTO(assignment);
//    }
//
//    @Transactional(readOnly = true)
//    public List<CodingResultsListItemDTO> listResults(Long testId) {
//        return assignmentRepository.findByTestId(testId).stream()
//                .map(a -> CodingResultsListItemDTO.builder()
//                        .assignmentId(a.getId())
//                        .studentUsername(a.getStudentUsername())
//                        .status(a.getStatus())
//                        .score(a.getScore())
//                        .totalMarks(a.getTotalMarks())
//                        .submittedAt(a.getSubmittedAt())
//                        .violationType(a.getViolationType())
//                        .build())
//                .collect(Collectors.toList());
//    }
//
//    @Transactional
//    public void setResultsPublished(Long testId, boolean publish) {
//        CodingTest test = testRepository.findById(testId)
//                .orElseThrow(() -> new AssignmentNotFoundException("No such coding test: " + testId));
//        test.setResultsPublished(publish);
//        testRepository.save(test);
//    }
//
//    // =====================================================================
//    // internals
//    // =====================================================================
//
//    private CodingTestAssignment getAssignmentOrThrow(Long testId, String username) {
//        return assignmentRepository.findByTestIdAndStudentUsername(testId, username)
//                .orElseThrow(() -> new AssignmentNotFoundException("No coding test assigned to you with id " + testId));
//    }
//
//    private CodingTestAssignment requireActiveSession(Long testId, String username) {
//        CodingTestAssignment assignment = getAssignmentOrThrow(testId, username);
//        if (assignment.getStatus() != CodingAssignmentStatus.IN_PROGRESS) {
//            throw new CodingSessionNotActiveException("This test session is not currently active.");
//        }
//        if (LocalDateTime.now().isAfter(assignment.getDeadline())) {
//            throw new CodingSessionNotActiveException("Time is up for this test.");
//        }
//        return assignment;
//    }
//
//    private CodingQuestion requireQuestion(CodingTestAssignment assignment, Long questionId) {
//        CodingQuestion question = questionRepository.findById(questionId)
//                .orElseThrow(() -> new IllegalArgumentException("No such question: " + questionId));
//        if (!question.getTest().getId().equals(assignment.getTest().getId())) {
//            throw new IllegalArgumentException("That question does not belong to this test.");
//        }
//        return question;
//    }
//
//    private RunOutcome runAgainstTestCases(String language, String code, List<TestCase> cases, boolean maskHidden) {
//        List<TestCaseRunResult> results = new ArrayList<>();
//        int passed = 0;
//
//        if (!CodeExecutionService.isSupported(language)) {
//            for (TestCase tc : cases) {
//                boolean hide = maskHidden && tc.isHidden();
//                results.add(TestCaseRunResult.builder()
//                        .hidden(tc.isHidden())
//                        .input(hide ? null : tc.getInput())
//                        .expectedOutput(hide ? null : tc.getExpectedOutput())
//                        .actualOutput(null)
//                        .passed(false)
//                        .errorMessage("Unsupported language: " + language)
//                        .build());
//            }
//            return new RunOutcome(results, 0);
//        }
//
//        for (TestCase tc : cases) {
//            CodeExecutionService.ExecutionResult exec = codeExecutionService.execute(language, code, tc.getInput());
//            boolean passedTc = exec.isSuccess() && CodeExecutionService.outputsMatch(tc.getExpectedOutput(), exec.getStdout());
//            if (passedTc) passed++;
//
//            boolean hide = maskHidden && tc.isHidden();
//            String error = exec.getErrorMessage() != null
//                    ? exec.getErrorMessage()
//                    : (exec.getStderr() != null && !exec.getStderr().isBlank() ? exec.getStderr() : null);
//
//            results.add(TestCaseRunResult.builder()
//                    .hidden(tc.isHidden())
//                    .input(hide ? null : tc.getInput())
//                    .expectedOutput(hide ? null : tc.getExpectedOutput())
//                    .actualOutput(hide ? null : exec.getStdout())
//                    .passed(passedTc)
//                    .errorMessage(hide ? null : error)
//                    .build());
//        }
//        return new RunOutcome(results, passed);
//    }
//
//    /** Runs (or reuses already-scored) code for every question in the test and
//     * finalizes the assignment. Used by final submit, violation auto-submit,
//     * and forced resume-attempt submit alike. */
//    private void finalizeAssignment(CodingTestAssignment assignment, ViolationType violationType,
//                                     List<PendingCodeSubmission> pendingCode) {
//        List<CodingQuestion> questions = questionRepository.findByTestIdOrderByOrderIndexAsc(assignment.getTest().getId());
//        Map<Long, PendingCodeSubmission> pendingByQuestion = pendingCode == null ? Map.of() : pendingCode.stream()
//                .filter(p -> p.getQuestionId() != null)
//                .collect(Collectors.toMap(PendingCodeSubmission::getQuestionId, p -> p, (a, b) -> b));
//
//        int totalScore = 0;
//        for (CodingQuestion q : questions) {
//            CodeSubmission existing = submissionRepository.findByAssignmentIdAndQuestionId(assignment.getId(), q.getId())
//                    .orElse(null);
//
//            if (existing != null && existing.getPassedCount() != null) {
//                // Already explicitly submitted via submitQuestion(); keep that score.
//                totalScore += existing.getScore() == null ? 0 : existing.getScore();
//                continue;
//            }
//
//            String language = null;
//            String code = null;
//            PendingCodeSubmission pc = pendingByQuestion.get(q.getId());
//            if (pc != null && pc.getCode() != null && !pc.getCode().isBlank()) {
//                language = pc.getLanguage();
//                code = pc.getCode();
//            } else if (existing != null && existing.getCode() != null && !existing.getCode().isBlank()) {
//                language = existing.getLanguage();
//                code = existing.getCode();
//            }
//
//            if (code == null || language == null || !CodeExecutionService.isSupported(language)) {
//                continue; // nothing written for this question -> 0 points
//            }
//
//            List<TestCase> allCases = testCaseRepository.findByQuestionIdOrderByOrderIndexAsc(q.getId());
//            RunOutcome outcome = runAgainstTestCases(language, code, allCases, true);
//            int total = allCases.size();
//            int score = total == 0 ? 0 : (int) Math.round(q.getPoints() * (outcome.getPassedCount() / (double) total));
//
//            CodeSubmission cs = existing != null ? existing
//                    : CodeSubmission.builder().assignment(assignment).question(q).build();
//            cs.setLanguage(language);
//            cs.setCode(code);
//            cs.setPassedCount(outcome.getPassedCount());
//            cs.setTotalCount(total);
//            cs.setScore(score);
//            LocalDateTime now = LocalDateTime.now();
//            cs.setLastSavedAt(now);
//            cs.setLastSubmittedAt(now);
//            submissionRepository.save(cs);
//
//            totalScore += score;
//        }
//
//        assignment.setScore(totalScore);
//        assignment.setSubmittedAt(LocalDateTime.now());
//        assignment.setViolationType(violationType);
//        assignment.setStatus(violationType == null ? CodingAssignmentStatus.SUBMITTED : CodingAssignmentStatus.AUTO_SUBMITTED);
//        assignmentRepository.save(assignment);
//    }
//
//    private CodingTestResultResponse toResultResponse(CodingTestAssignment assignment) {
//        boolean published = assignment.getTest().isResultsPublished();
//        Integer score = null;
//        Integer totalMarks = null;
//        Double percentage = null;
//        List<QuestionResultDTO> questionResults = null;
//
//        if (published) {
//            score = assignment.getScore();
//            totalMarks = assignment.getTotalMarks();
//            percentage = (totalMarks != null && totalMarks > 0 && score != null)
//                    ? Math.round((score * 10000.0) / totalMarks) / 100.0
//                    : 0.0;
//
//            List<CodingQuestion> questions = questionRepository.findByTestIdOrderByOrderIndexAsc(assignment.getTest().getId());
//            Map<Long, CodeSubmission> byQuestion = submissionRepository.findByAssignmentId(assignment.getId()).stream()
//                    .collect(Collectors.toMap(cs -> cs.getQuestion().getId(), cs -> cs));
//
//            questionResults = questions.stream()
//                    .map(q -> {
//                        CodeSubmission cs = byQuestion.get(q.getId());
//                        return QuestionResultDTO.builder()
//                                .questionId(q.getId())
//                                .title(q.getTitle())
//                                .passedCount(cs != null && cs.getPassedCount() != null ? cs.getPassedCount() : 0)
//                                .totalCount(cs != null && cs.getTotalCount() != null ? cs.getTotalCount()
//                                        : testCaseRepository.findByQuestionIdOrderByOrderIndexAsc(q.getId()).size())
//                                .score(cs != null && cs.getScore() != null ? cs.getScore() : 0)
//                                .maxScore(q.getPoints())
//                                .build();
//                    })
//                    .collect(Collectors.toList());
//        }
//
//        return CodingTestResultResponse.builder()
//                .assignmentId(assignment.getId())
//                .testId(assignment.getTest().getId())
//                .title(assignment.getTest().getTitle())
//                .status(assignment.getStatus())
//                .resultsPublished(published)
//                .score(score)
//                .totalMarks(totalMarks)
//                .percentage(percentage)
//                .questionResults(questionResults)
//                .submittedAt(assignment.getSubmittedAt())
//                .violationType(assignment.getViolationType())
//                .resumeDecision(assignment.getResumeDecision())
//                .build();
//    }
//
//    private CodingAssignmentSummaryDTO toSummaryDTO(CodingTestAssignment a) {
//        boolean published = a.getTest().isResultsPublished();
//        boolean terminal = a.getStatus() == CodingAssignmentStatus.SUBMITTED || a.getStatus() == CodingAssignmentStatus.AUTO_SUBMITTED;
//        return CodingAssignmentSummaryDTO.builder()
//                .assignmentId(a.getId())
//                .testId(a.getTest().getId())
//                .title(a.getTest().getTitle())
//                .durationMinutes(a.getTest().getDurationMinutes())
//                .totalQuestions(questionRepository.findByTestIdOrderByOrderIndexAsc(a.getTest().getId()).size())
//                .status(a.getStatus())
//                .score(published && terminal ? a.getScore() : null)
//                .totalMarks(published && terminal ? a.getTotalMarks() : null)
//                .resultsPublished(published)
//                .resumeDecision(a.getResumeDecision())
//                .build();
//    }
//
//    private PendingResumeRequestDTO toPendingDTO(CodingTestAssignment a) {
//        return PendingResumeRequestDTO.builder()
//                .assignmentId(a.getId())
//                .testId(a.getTest().getId())
//                .testTitle(a.getTest().getTitle())
//                .studentUsername(a.getStudentUsername())
//                .violationType(a.getViolationType())
//                .violationOccurredAt(a.getViolationOccurredAt())
//                .screenshotBase64(a.getViolationScreenshot())
//                .remainingSecondsAtViolation(a.getRemainingSecondsAtViolation())
//                .resumeDecision(a.getResumeDecision())
//                .resumeCount(a.getResumeCount())
//                .build();
//    }
//
//    @Getter
//    @AllArgsConstructor
//    private static class RunOutcome {
//        private final List<TestCaseRunResult> results;
//        private final int passedCount;
//    }
//}
