package com.example.demo.dto.coding;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestCaseInput {
    private String input;
    private String expectedOutput;
    private boolean hidden;
}
