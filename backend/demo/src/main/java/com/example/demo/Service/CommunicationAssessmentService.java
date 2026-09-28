package com.example.demo.service;

import com.example.demo.dto.CommunicationAssessmentRequest;
import com.example.demo.dto.CommunicationAssessmentResponse;
import com.example.demo.entity.CommunicationAssessment;
import com.example.demo.repository.CommunicationAssessmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunicationAssessmentService {

    private final CommunicationAssessmentRepository repository;

    public CommunicationAssessmentResponse saveAssessment(
            CommunicationAssessmentRequest request) {

        if (request.getStudentId() == null) {
            throw new IllegalArgumentException("Student ID is required");
        }

        if (request.getCategory() == null || request.getCategory().isBlank()) {
            throw new IllegalArgumentException("Communication category is required");
        }

        CommunicationAssessment assessment =
                CommunicationAssessment.builder()
                        .studentId(request.getStudentId())
                        .category(request.getCategory())
                        .overallScore(request.getOverallScore())
                        .overallSummary(request.getOverallSummary())
                        .questionCount(
                                request.getQuestionCount() != null
                                        ? request.getQuestionCount()
                                        : 0
                        )
                        .totalDurationSeconds(request.getTotalDurationSeconds())
                        .scored(
                                request.getScored() != null
                                        ? request.getScored()
                                        : false
                        )
                        .attemptedAt(LocalDateTime.now())
                        .build();

        CommunicationAssessment saved = repository.save(assessment);

        return convertToResponse(saved);
    }

    public List<CommunicationAssessmentResponse> getStudentAssessments(
            Long studentId) {

        return repository
                .findByStudentIdOrderByAttemptedAtDesc(studentId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public CommunicationAssessmentResponse getLatestAssessment(
            Long studentId) {

        return repository
                .findTopByStudentIdOrderByAttemptedAtDesc(studentId)
                .map(this::convertToResponse)
                .orElse(null);
    }

    public Double getLatestScore(Long studentId) {

        return repository
                .findTopByStudentIdOrderByAttemptedAtDesc(studentId)
                .map(CommunicationAssessment::getOverallScore)
                .map(Integer::doubleValue)
                .orElse(0.0);
    }

    public long getAttemptCount(Long studentId) {
        return repository.countByStudentId(studentId);
    }

    private CommunicationAssessmentResponse convertToResponse(
            CommunicationAssessment assessment) {

        return CommunicationAssessmentResponse.builder()
                .id(assessment.getId())
                .studentId(assessment.getStudentId())
                .category(assessment.getCategory())
                .overallScore(assessment.getOverallScore())
                .overallSummary(assessment.getOverallSummary())
                .questionCount(assessment.getQuestionCount())
                .totalDurationSeconds(assessment.getTotalDurationSeconds())
                .scored(assessment.getScored())
                .attemptedAt(assessment.getAttemptedAt())
                .build();
    }
}