package com.example.demo.dto.coding;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionInput {
    private String title;
    private String description;
    private String difficulty;      // EASY / MEDIUM / HARD
    private Integer points;         // defaults to 100 if omitted
    private String constraintsText;
    private List<TestCaseInput> testCases;
}
