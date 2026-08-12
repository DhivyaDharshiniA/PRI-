package com.example.demo.Service;

import com.example.demo.config.AptitudeProperties;
import com.example.demo.dto.*;
import com.example.demo.entity.aptitude.*;
import com.example.demo.exception.AssignmentNotFoundException;
import com.example.demo.exception.ResumeNotAllowedException;
import com.example.demo.exception.TestAlreadySubmittedException;
import com.example.demo.repository.AptitudeQuestionRepository;
import com.example.demo.repository.AptitudeTestRepository;
import com.example.demo.repository.StudentAnswerRepository;
import com.example.demo.repository.TestAssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AptitudeTestService {

    private final AptitudeTestRepository testRepository;
    private final AptitudeQuestionRepository questionRepository;
    private final TestAssignmentRepository assignmentRepository;
    private final StudentAnswerRepository answerRepository;
    private final ExternalAptitudeQuestionService externalQuestionService;
    private final StudentDirectory studentDirectory;
    private final AptitudeProperties properties;

    // ---------- ADMIN: publish ----------

    @Transactional
    public PublishTestResponse publishTest(PublishTestRequest request, String adminUsername) {
        int questionCount = request.getQuestionCount() != null
                ? request.getQuestionCount() : properties.getTest().getDefaultQuestionCount();
        int duration = request.getDurationMinutes() != null
                ? request.getDurationMinutes() : properties.getTest().getDefaultDurationMinutes();
        String title = (request.getTitle() != null && !request.getTitle().isBlank())
                ? request.getTitle()
                : "Aptitude Evaluation - " + LocalDateTime.now().toLocalDate();

        List<RawQuestion> rawQuestions = externalQuestionService.fetchQuestions(questionCount);

        AptitudeTest test = testRepository.save(AptitudeTest.builder()
                .title(title)
                .durationMinutes(duration)
                .totalQuestions(rawQuestions.size())
                .createdByUsername(adminUsername)
                .publishedAt(LocalDateTime.now())
                .build());

        int idx = 0;
        for (RawQuestion rq : rawQuestions) {
            questionRepository.save(AptitudeQuestion.builder()
                    .test(test)
                    .questionText(rq.getQuestion())
                    .options(rq.getOptions())
                    .correctAnswer(rq.getAnswer())
                    .explanation(rq.getExplanation())
                    .orderIndex(idx++)
                    .sourceTopic(rq.getTopic())
                    .build());
        }

        List<String> students = studentDirectory.findAllStudentUsernames();
        for (String username : students) {
            assignmentRepository.save(TestAssignment.builder()
                    .test(test)
                    .studentUsername(username)
                    .status(AssignmentStatus.ASSIGNED)
                    .totalMarks(rawQuestions.size())
                    .build());
        }

        return PublishTestResponse.builder()
                .testId(test.getId())
                .title(test.getTitle())
                .durationMinutes(test.getDurationMinutes())
                .totalQuestions(test.getTotalQuestions())
                .studentsAssigned(students.size())
                .build();
    }

    // ---------- STUDENT: list assigned tests ----------

    @Transactional(readOnly = true)
    public List<AssignmentSummaryDTO> listAssignmentsForStudent(String username) {
        return assignmentRepository.findByStudentUsernameOrderByIdDesc(username).stream()
                .map(a -> AssignmentSummaryDTO.builder()
                        .assignmentId(a.getId())
                        .testId(a.getTest().getId())
                        .title(a.getTest().getTitle())
                        .durationMinutes(a.getTest().getDurationMinutes())
                        .totalQuestions(a.getTest().getTotalQuestions())
                        .status(a.getStatus())
                        .score(a.getScore())
                        .build())
                .collect(Collectors.toList());
    }

    // ---------- STUDENT: start (no resuming) ----------

    @Transactional
    public StartTestResponse startTest(Long testId, String username) {
        TestAssignment assignment = getAssignmentOrThrow(testId, username);

        if (assignment.getStatus() == AssignmentStatus.SUBMITTED
                || assignment.getStatus() == AssignmentStatus.AUTO_SUBMITTED) {
            throw new TestAlreadySubmittedException("This test has already been submitted. Resuming is not allowed.");
        }

        if (assignment.getStatus() == AssignmentStatus.IN_PROGRESS) {
            // Any second call to /start (refresh, reopen, new tab) = resume attempt.
            // Force-submit whatever was auto-saved so far and reject.
            finalizeAssignment(assignment, ViolationType.RESUME_ATTEMPT);
            throw new ResumeNotAllowedException("This test session was already in progress and cannot be resumed. It has been submitted with your saved answers.");
        }

        LocalDateTime now = LocalDateTime.now();
        assignment.setStatus(AssignmentStatus.IN_PROGRESS);
        assignment.setStartedAt(now);
        assignment.setDeadline(now.plusMinutes(assignment.getTest().getDurationMinutes()));
        assignmentRepository.save(assignment);

        List<AptitudeQuestion> questions = questionRepository.findByTestIdOrderByOrderIndexAsc(testId);
        List<QuestionDTO> questionDTOs = questions.stream()
                .map(q -> QuestionDTO.builder()
                        .id(q.getId())
                        .questionText(q.getQuestionText())
                        .options(q.getOptions())
                        .orderIndex(q.getOrderIndex())
                        .build())
                .collect(Collectors.toList());

        return StartTestResponse.builder()
                .assignmentId(assignment.getId())
                .testId(testId)
                .title(assignment.getTest().getTitle())
                .durationMinutes(assignment.getTest().getDurationMinutes())
                .serverTime(now)
                .deadline(assignment.getDeadline())
                .questions(questionDTOs)
                .build();
    }

    // ---------- STUDENT: autosave a single answer ----------

    @Transactional
    public void saveAnswer(Long testId, String username, AnswerSubmission submission) {
        TestAssignment assignment = getAssignmentOrThrow(testId, username);
        if (assignment.getStatus() != AssignmentStatus.IN_PROGRESS) {
            return; // silently ignore stray autosaves after the session ended
        }
        if (LocalDateTime.now().isAfter(assignment.getDeadline())) {
            return; // time's up; frontend should be auto-submitting right about now
        }
        upsertAnswer(assignment, submission);
    }

    // ---------- STUDENT: violation (tab switch / fullscreen exit) ----------

    @Transactional
    public TestResultResponse reportViolation(Long testId, String username, ViolationRequest request) {
        TestAssignment assignment = getAssignmentOrThrow(testId, username);
        if (assignment.getStatus() != AssignmentStatus.IN_PROGRESS) {
            return toResultResponse(assignment); // already finalized, just return current result
        }
        if (request.getPendingAnswers() != null && request.getPendingAnswers().getAnswers() != null) {
            for (AnswerSubmission a : request.getPendingAnswers().getAnswers()) {
                upsertAnswer(assignment, a);
            }
        }
        finalizeAssignment(assignment, request.getType() != null ? request.getType() : ViolationType.TAB_SWITCH);
        return toResultResponse(assignment);
    }

    // ---------- STUDENT: normal submit ----------

    @Transactional
    public TestResultResponse submitTest(Long testId, String username, SubmitTestRequest request) {
        TestAssignment assignment = getAssignmentOrThrow(testId, username);

        if (assignment.getStatus() == AssignmentStatus.SUBMITTED
                || assignment.getStatus() == AssignmentStatus.AUTO_SUBMITTED) {
            return toResultResponse(assignment); // idempotent: return existing result
        }

        if (request.getAnswers() != null) {
            for (AnswerSubmission a : request.getAnswers()) {
                upsertAnswer(assignment, a);
            }
        }

        boolean timeExpired = LocalDateTime.now().isAfter(assignment.getDeadline());
        finalizeAssignment(assignment, timeExpired ? ViolationType.TIME_EXPIRED : null);
        return toResultResponse(assignment);
    }

    // ---------- STUDENT: fetch result for an already-submitted test ----------

    @Transactional(readOnly = true)
    public TestResultResponse getResult(Long testId, String username) {
        TestAssignment assignment = getAssignmentOrThrow(testId, username);
        if (assignment.getStatus() != AssignmentStatus.SUBMITTED
                && assignment.getStatus() != AssignmentStatus.AUTO_SUBMITTED) {
            throw new AssignmentNotFoundException("Test has not been submitted yet.");
        }
        return toResultResponse(assignment);
    }

    // ---------- internals ----------

    private TestAssignment getAssignmentOrThrow(Long testId, String username) {
        return assignmentRepository.findByTestIdAndStudentUsername(testId, username)
                .orElseThrow(() -> new AssignmentNotFoundException("No aptitude test assigned to you with id " + testId));
    }

    private void upsertAnswer(TestAssignment assignment, AnswerSubmission submission) {
        AptitudeQuestion question = questionRepository.findById(submission.getQuestionId())
                .orElse(null);
        if (question == null || !question.getTest().getId().equals(assignment.getTest().getId())) {
            return; // ignore answers for questions that don't belong to this test
        }
        StudentAnswer answer = answerRepository
                .findByAssignmentIdAndQuestionId(assignment.getId(), question.getId())
                .orElse(StudentAnswer.builder().assignment(assignment).question(question).build());
        answer.setSelectedOption(submission.getSelectedOption());
        answerRepository.save(answer);
    }

    private void finalizeAssignment(TestAssignment assignment, ViolationType violationType) {
        List<StudentAnswer> answers = answerRepository.findByAssignmentId(assignment.getId());
        List<AptitudeQuestion> questions = questionRepository.findByTestIdOrderByOrderIndexAsc(assignment.getTest().getId());

        Map<Long, String> correctByQuestionId = questions.stream()
                .collect(Collectors.toMap(AptitudeQuestion::getId, AptitudeQuestion::getCorrectAnswer));

        int score = 0;
        for (StudentAnswer a : answers) {
            String correct = correctByQuestionId.get(a.getQuestion().getId());
            if (correct != null && a.getSelectedOption() != null && correct.equals(a.getSelectedOption())) {
                score++;
            }
        }

        assignment.setScore(score);
        assignment.setTotalMarks(questions.size());
        assignment.setSubmittedAt(LocalDateTime.now());
        assignment.setViolationType(violationType);
        assignment.setStatus(violationType == null ? AssignmentStatus.SUBMITTED : AssignmentStatus.AUTO_SUBMITTED);
        assignmentRepository.save(assignment);
    }

    private TestResultResponse toResultResponse(TestAssignment assignment) {
        double percentage = assignment.getTotalMarks() != null && assignment.getTotalMarks() > 0
                ? Math.round((assignment.getScore() * 10000.0) / assignment.getTotalMarks()) / 100.0
                : 0.0;
        return TestResultResponse.builder()
                .assignmentId(assignment.getId())
                .testId(assignment.getTest().getId())
                .title(assignment.getTest().getTitle())
                .status(assignment.getStatus())
                .score(assignment.getScore())
                .totalMarks(assignment.getTotalMarks())
                .percentage(percentage)
                .submittedAt(assignment.getSubmittedAt())
                .violationType(assignment.getViolationType())
                .build();
    }
}
