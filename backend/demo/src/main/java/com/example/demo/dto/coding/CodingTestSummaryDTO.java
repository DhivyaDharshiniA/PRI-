package com.example.demo.dto.coding;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodingTestSummaryDTO {
    private Long testId;
    private String title;
    private Integer durationMinutes;
    private LocalDateTime publishedAt;
    private boolean resultsPublished;
    private int totalQuestions;
    private int totalStudents;
    private int submittedCount;      // SUBMITTED or AUTO_SUBMITTED
    private int inProgressCount;
    private int pendingViolationCount;
}