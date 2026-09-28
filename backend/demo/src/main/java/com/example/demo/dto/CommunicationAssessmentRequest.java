package com.example.demo.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommunicationAssessmentRequest {

    private Long studentId;

    private String category;

    private Integer overallScore;

    private String overallSummary;

    private Integer questionCount;

    private Integer totalDurationSeconds;

    private Boolean scored;

    private List<CommunicationAnswerRequest> answers;
}