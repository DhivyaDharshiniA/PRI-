package com.example.demo.controller;

import com.example.demo.dto.PublishTestRequest;
import com.example.demo.dto.PublishTestResponse;
import lombok.RequiredArgsConstructor;
import com.example.demo.Service.AptitudeTestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/aptitude-tests")
@RequiredArgsConstructor
public class AdminAptitudeTestController {

    private final AptitudeTestService aptitudeTestService;

    /**
     * Publishing a test automatically fetches the questions and assigns the
     * test to every student in one call. Wire ROLE_ADMIN to whatever your
     * existing security config calls its admin role.
     */
    @PostMapping("/publish")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PublishTestResponse> publish(
            @RequestBody(required = false) PublishTestRequest request,
            Authentication authentication) {
        PublishTestRequest req = request != null ? request : new PublishTestRequest();
        PublishTestResponse response = aptitudeTestService.publishTest(req, authentication.getName());
        return ResponseEntity.ok(response);
    }
}
