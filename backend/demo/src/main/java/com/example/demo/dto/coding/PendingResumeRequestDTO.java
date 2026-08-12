package com.example.demo.dto.coding;

import com.example.demo.entity.aptitude.ViolationType;
import com.example.demo.entity.coding.ResumeDecision;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PendingResumeRequestDTO {
    private Long assignmentId;
    private Long testId;
    private String testTitle;
    private String studentUsername;
    private ViolationType violationType;
    private LocalDateTime violationOccurredAt;
    private String screenshotBase64;
    private Integer remainingSecondsAtViolation;
    private ResumeDecision resumeDecision;
    private int resumeCount;
}
