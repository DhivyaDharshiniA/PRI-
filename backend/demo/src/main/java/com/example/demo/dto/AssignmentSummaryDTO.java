package com.example.demo.dto;

import com.example.demo.entity.aptitude.AssignmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentSummaryDTO {
    private Long assignmentId;
    private Long testId;
    private String title;
    private Integer durationMinutes;
    private Integer totalQuestions;
    private AssignmentStatus status;
    private Integer score; // null unless submitted
}
