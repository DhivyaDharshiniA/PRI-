package com.example.demo.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunicationAssessmentResponse {

    private Long id;

    private Long studentId;

    private String category;

    private Integer overallScore;

    private String overallSummary;

    private Integer questionCount;

    private Integer totalDurationSeconds;

    private Boolean scored;

    private LocalDateTime attemptedAt;
}