package com.example.demo.dto.coding;

import com.example.demo.entity.aptitude.ViolationType;
import com.example.demo.entity.coding.CodingAssignmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodingResultsListItemDTO {
    private Long assignmentId;
    private String studentUsername;
    private CodingAssignmentStatus status;
    private Integer score;
    private Integer totalMarks;
    private LocalDateTime submittedAt;
    private ViolationType violationType;
}
