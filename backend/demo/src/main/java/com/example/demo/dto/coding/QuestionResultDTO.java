package com.example.demo.dto.coding;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResultDTO {
    private Long questionId;
    private String title;
    private Integer passedCount;
    private Integer totalCount;
    private Integer score;
    private Integer maxScore;
}
