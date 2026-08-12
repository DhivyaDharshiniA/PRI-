package com.example.demo.dto;

import com.example.demo.entity.aptitude.ViolationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ViolationRequest {
    private ViolationType type;
    // Optional: any answers the frontend had buffered locally but not yet
    // auto-saved, sent as a last-gasp payload when a violation fires.
    private SubmitTestRequest pendingAnswers;
}
