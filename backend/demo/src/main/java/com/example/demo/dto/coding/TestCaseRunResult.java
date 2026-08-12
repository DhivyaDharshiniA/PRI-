package com.example.demo.dto.coding;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestCaseRunResult {
    private boolean hidden;
    private String input;            // null when hidden
    private String expectedOutput;   // null when hidden
    private String actualOutput;     // null when hidden
    private boolean passed;
    private String errorMessage;     // stderr/compile error, null when hidden or none
}
