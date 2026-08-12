package com.example.demo.dto.coding;

import com.example.demo.entity.coding.CodingAssignmentStatus;
import com.example.demo.entity.coding.ResumeDecision;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodingAssignmentSummaryDTO {
    private Long assignmentId;
    private Long testId;
    private String title;
    private Integer durationMinutes;
    private Integer totalQuestions;
    private CodingAssignmentStatus status;
    private Integer score;          // null unless results are published
    private Integer totalMarks;
    private boolean resultsPublished;
    private ResumeDecision resumeDecision;
}
