package com.example.demo.dto.coding;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResumeDecisionRequest {
    /** true = Placement Cell allows the student to resume; false = denied, final. */
    private boolean approve;
}
