package com.example.demo.controller;

import com.example.demo.dto.CommunicationAssessmentRequest;
import com.example.demo.dto.CommunicationAssessmentResponse;
import com.example.demo.service.CommunicationAssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/communication")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CommunicationAssessmentController {

    private final CommunicationAssessmentService service;

    /*
     * Save a completed communication assessment.
     */
    @PostMapping("/submit")
    public ResponseEntity<CommunicationAssessmentResponse> submitAssessment(
            @RequestBody CommunicationAssessmentRequest request) {

        return ResponseEntity.ok(
                service.saveAssessment(request)
        );
    }

    /*
     * Get all communication assessment attempts of a student.
     */
    @GetMapping("/history/{studentId}")
    public ResponseEntity<List<CommunicationAssessmentResponse>> getHistory(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                service.getStudentAssessments(studentId)
        );
    }

    /*
     * Get latest communication assessment.
     */
    @GetMapping("/latest/{studentId}")
    public ResponseEntity<CommunicationAssessmentResponse> getLatest(
            @PathVariable Long studentId) {

        CommunicationAssessmentResponse result =
                service.getLatestAssessment(studentId);

        if (result == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(result);
    }

    /*
     * Get latest communication score.
     */
    @GetMapping("/score/{studentId}")
    public ResponseEntity<Double> getLatestScore(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                service.getLatestScore(studentId)
        );
    }

    /*
     * Get total number of attempts.
     */
    @GetMapping("/attempt-count/{studentId}")
    public ResponseEntity<Long> getAttemptCount(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                service.getAttemptCount(studentId)
        );
    }
}