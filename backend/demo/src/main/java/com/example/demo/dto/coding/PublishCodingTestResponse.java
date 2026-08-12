package com.example.demo.dto.coding;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PublishCodingTestResponse {
    private Long testId;
    private String title;
    private Integer durationMinutes;
    private Integer totalQuestions;
    private Integer studentsAssigned;
}
