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
public class SubmitCodingTestRequest {
    // Any questions the student never explicitly pressed "Submit" for --
    // they still get run and scored at final submit time.
    private List<PendingCodeSubmission> pendingCode;
}
