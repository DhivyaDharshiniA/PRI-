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
public class CodingQuestionDTO {
    private Long id;
    private String title;
    private String description;
    private String difficulty;
    private Integer points;
    private String constraintsText;
    private Integer orderIndex;
    // Only non-hidden test cases are ever sent to the browser.
    private List<TestCaseDTO> sampleTestCases;
}
