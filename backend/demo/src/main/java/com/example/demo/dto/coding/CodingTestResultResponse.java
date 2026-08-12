package com.example.demo.dto.coding;

import com.example.demo.entity.aptitude.ViolationType;
import com.example.demo.entity.coding.CodingAssignmentStatus;
import com.example.demo.entity.coding.ResumeDecision;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodingTestResultResponse {
    private Long assignmentId;
    private Long testId;
    private String title;
    private CodingAssignmentStatus status;
    private boolean resultsPublished;

    // These stay null while resultsPublished == false, so students can't
    // peek at their score before the Placement Cell decides to release it.
    private Integer score;
    private Integer totalMarks;
    private Double percentage;
    private List<QuestionResultDTO> questionResults;

    private LocalDateTime submittedAt;
    private ViolationType violationType;
    private ResumeDecision resumeDecision;
}
