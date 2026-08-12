package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.Service.AptitudeTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/aptitude-tests")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class StudentAptitudeTestController {

    private final AptitudeTestService aptitudeTestService;

    @GetMapping
    public ResponseEntity<List<AssignmentSummaryDTO>> listAssignments(Authentication authentication) {
        return ResponseEntity.ok(aptitudeTestService.listAssignmentsForStudent(authentication.getName()));
    }

    /** Enters the timed session. Only succeeds once per test -- see service javadoc. */
    @PostMapping("/{testId}/start")
    public ResponseEntity<StartTestResponse> start(@PathVariable Long testId, Authentication authentication) {
        return ResponseEntity.ok(aptitudeTestService.startTest(testId, authentication.getName()));
    }

    /** Called on every answer selection (frontend should debounce ~300-500ms). */
    @PostMapping("/{testId}/answer")
    public ResponseEntity<Void> saveAnswer(@PathVariable Long testId,
                                            @RequestBody AnswerSubmission submission,
                                            Authentication authentication) {
        aptitudeTestService.saveAnswer(testId, authentication.getName(), submission);
        return ResponseEntity.noContent().build();
    }

    /** Called the instant the frontend detects a tab switch or fullscreen exit. */
    @PostMapping("/{testId}/violation")
    public ResponseEntity<TestResultResponse> reportViolation(@PathVariable Long testId,
                                                                @RequestBody ViolationRequest request,
                                                                Authentication authentication) {
        return ResponseEntity.ok(aptitudeTestService.reportViolation(testId, authentication.getName(), request));
    }

    @PostMapping("/{testId}/submit")
    public ResponseEntity<TestResultResponse> submit(@PathVariable Long testId,
                                                       @RequestBody SubmitTestRequest request,
                                                       Authentication authentication) {
        return ResponseEntity.ok(aptitudeTestService.submitTest(testId, authentication.getName(), request));
    }

    @GetMapping("/{testId}/result")
    public ResponseEntity<TestResultResponse> getResult(@PathVariable Long testId, Authentication authentication) {
        return ResponseEntity.ok(aptitudeTestService.getResult(testId, authentication.getName()));
    }
}
