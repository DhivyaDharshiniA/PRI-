package com.example.demo.dto;

import com.example.demo.entity.aptitude.AssignmentStatus;
import com.example.demo.entity.aptitude.ViolationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestResultResponse {
    private Long assignmentId;
    private Long testId;
    private String title;
    private AssignmentStatus status;
    private Integer score;
    private Integer totalMarks;
    private Double percentage;
    private LocalDateTime submittedAt;
    private ViolationType violationType; // null if a clean, normal submit
}
