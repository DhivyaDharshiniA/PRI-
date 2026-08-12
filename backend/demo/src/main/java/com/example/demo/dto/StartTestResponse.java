package com.example.demo.dto;

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
public class StartTestResponse {
    private Long assignmentId;
    private Long testId;
    private String title;
    private Integer durationMinutes;
    private LocalDateTime serverTime;   // client should sync its countdown to this
    private LocalDateTime deadline;
    private List<QuestionDTO> questions;
}
