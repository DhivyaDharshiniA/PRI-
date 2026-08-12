package com.example.demo.controller;

import com.example.demo.Service.CodingTestService;
import com.example.demo.dto.coding.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student/coding-tests")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class StudentCodingTestController {

    private final CodingTestService codingTestService;

    @GetMapping
    public ResponseEntity<List<CodingAssignmentSummaryDTO>> listAssignments(Authentication authentication) {
        return ResponseEntity.ok(codingTestService.listAssignmentsForStudent(authentication.getName()));
    }

    /** Enters (or, if the Placement Cell approved a resume, re-enters) the timed session. */
    @PostMapping("/{testId}/start")
    public ResponseEntity<StartCodingTestResponse> start(@PathVariable Long testId, Authentication authentication) {
        return ResponseEntity.ok(codingTestService.startTest(testId, authentication.getName()));
    }

    /** Silent autosave, fired periodically / on every editor keystroke debounce. Never scored. */
    @PutMapping("/{testId}/questions/{questionId}/code")
    public ResponseEntity<Void> autosave(@PathVariable Long testId, @PathVariable Long questionId,
                                          @RequestBody Map<String, String> body, Authentication authentication) {
        codingTestService.autosaveCode(testId, authentication.getName(), questionId,
                body.get("language"), body.get("code"));
        return ResponseEntity.noContent().build();
    }

    /** "Run" button -- executes against sample test cases only, never scored. */
    @PostMapping("/{testId}/questions/{questionId}/run")
    public ResponseEntity<RunCodeResponse> run(@PathVariable Long testId, @PathVariable Long questionId,
                                                @RequestBody RunCodeRequest request, Authentication authentication) {
        return ResponseEntity.ok(codingTestService.runCode(testId, authentication.getName(), questionId, request));
    }

    /** "Submit" button for a single question -- executes against every test case (including hidden) and scores it. */
    @PostMapping("/{testId}/questions/{questionId}/submit")
    public ResponseEntity<SubmitQuestionResponse> submitQuestion(@PathVariable Long testId, @PathVariable Long questionId,
                                                                  @RequestBody RunCodeRequest request, Authentication authentication) {
        return ResponseEntity.ok(codingTestService.submitQuestion(testId, authentication.getName(), questionId, request));
    }

    /** Fired by the browser the instant focus/fullscreen is lost or the tab is switched.
     * Auto-submits the whole test and forwards a screenshot to the Placement Cell for review. */
    @PostMapping("/{testId}/violation")
    public ResponseEntity<CodingTestResultResponse> reportViolation(@PathVariable Long testId,
                                                                      @RequestBody CodingViolationRequest request,
                                                                      Authentication authentication) {
        return ResponseEntity.ok(codingTestService.reportViolation(testId, authentication.getName(), request));
    }

    @PostMapping("/{testId}/submit")
    public ResponseEntity<CodingTestResultResponse> submit(@PathVariable Long testId,
                                                             @RequestBody(required = false) SubmitCodingTestRequest request,
                                                             Authentication authentication) {
        return ResponseEntity.ok(codingTestService.submitTest(testId, authentication.getName(), request));
    }

    @GetMapping("/{testId}/result")
    public ResponseEntity<CodingTestResultResponse> result(@PathVariable Long testId, Authentication authentication) {
        return ResponseEntity.ok(codingTestService.getResult(testId, authentication.getName()));
    }
}
