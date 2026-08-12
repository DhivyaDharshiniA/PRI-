package com.example.demo.dto.coding;

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
public class StartCodingTestResponse {
    private Long assignmentId;
    private Long testId;
    private String title;
    private Integer durationMinutes;
    private LocalDateTime serverTime;
    private LocalDateTime deadline;
    private List<CodingQuestionDTO> questions;
    private List<SavedCodeDTO> savedCode; // code the student had already written, e.g. after a PC-approved resume
    private boolean resumed;
}
