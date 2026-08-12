package com.example.demo.dto.coding;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubmitQuestionResponse {
    private Long questionId;
    private int passedCount;
    private int totalCount;
    private int score;
    private int maxScore;
    private List<TestCaseRunResult> results;
}
