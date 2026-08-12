package com.example.demo.dto.coding;

import com.example.demo.entity.aptitude.ViolationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CodingViolationRequest {
    private ViolationType type;

    /** Data-URL (e.g. "data:image/png;base64,...") captured by the browser
     * the instant the violation fired. Sent only to the Placement Cell. */
    private String screenshotBase64;

    /** Whatever code the student had open in each editor tab at the moment
     * of the violation, so nothing is lost even though the session ends. */
    private List<PendingCodeSubmission> pendingCode;
}
