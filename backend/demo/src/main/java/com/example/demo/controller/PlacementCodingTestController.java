//package com.example.demo.controller;
//
//import com.example.demo.Service.CodingTestService;
//import com.example.demo.dto.coding.*;
//import com.example.demo.entity.Role;
//import com.example.demo.entity.User;
//import com.example.demo.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
///**
// * Everything here is Placement-Cell-only. Deciding whether a student may
// * resume after a proctoring violation is the one action in this whole module
// * that a student can never trigger themselves -- it is verified explicitly
// * below (not just via the route prefix) because that guarantee matters.
// */
//@RestController
//@RequestMapping("/api/placement/coding-tests")
//@RequiredArgsConstructor
//public class PlacementCodingTestController {
//
//    private final CodingTestService codingTestService;
//    private final UserRepository userRepository;
//
//    private ResponseEntity<?> requirePlacementCell(Authentication authentication) {
//        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
//        if (user == null || user.getRole() != Role.PLACEMENT_CELL) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN)
//                    .body(Map.of("error", "FORBIDDEN", "message", "Only the Placement Cell can perform this action."));
//        }
//        return null;
//    }
//
//    @PostMapping("/publish")
//    public ResponseEntity<?> publish(@RequestBody PublishCodingTestRequest request, Authentication authentication) {
//        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
//        if (forbidden != null) return forbidden;
//        return ResponseEntity.ok(codingTestService.publishTest(request, authentication.getName()));
//    }
//
//    /** All pending resume requests across every test, each carrying the violation screenshot. */
//    @GetMapping("/violations")
//    public ResponseEntity<?> pendingViolations(@RequestParam(required = false) Long testId, Authentication authentication) {
//        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
//        if (forbidden != null) return forbidden;
//        return ResponseEntity.ok(codingTestService.listPendingResumeRequests(testId));
//    }
//
//    /** The only place a resume can be granted or denied. Students cannot call this. */
//    @PostMapping("/assignments/{assignmentId}/resume-decision")
//    public ResponseEntity<?> decideResume(@PathVariable Long assignmentId,
//                                           @RequestBody ResumeDecisionRequest request,
//                                           Authentication authentication) {
//        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
//        if (forbidden != null) return forbidden;
//        return ResponseEntity.ok(codingTestService.decideResume(assignmentId, request.isApprove(), authentication.getName()));
//    }
//
//    @GetMapping("/{testId}/results")
//    public ResponseEntity<?> results(@PathVariable Long testId, Authentication authentication) {
//        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
//        if (forbidden != null) return forbidden;
//        return ResponseEntity.ok(codingTestService.listResults(testId));
//    }
//
//    @PostMapping("/{testId}/publish-results")
//    public ResponseEntity<?> publishResults(@PathVariable Long testId, Authentication authentication) {
//        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
//        if (forbidden != null) return forbidden;
//        codingTestService.setResultsPublished(testId, true);
//        return ResponseEntity.ok(Map.of("testId", testId, "resultsPublished", true));
//    }
//
//    @PostMapping("/{testId}/unpublish-results")
//    public ResponseEntity<?> unpublishResults(@PathVariable Long testId, Authentication authentication) {
//        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
//        if (forbidden != null) return forbidden;
//        codingTestService.setResultsPublished(testId, false);
//        return ResponseEntity.ok(Map.of("testId", testId, "resultsPublished", false));
//    }
//}


package com.example.demo.controller;

import com.example.demo.Service.CodingTestService;
import com.example.demo.dto.coding.*;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Everything here is Placement-Cell-only. Deciding whether a student may
 * resume after a proctoring violation is the one action in this whole module
 * that a student can never trigger themselves -- it is verified explicitly
 * below (not just via the route prefix) because that guarantee matters.
 */
@RestController
@RequestMapping("/api/placement/coding-tests")
@RequiredArgsConstructor
public class PlacementCodingTestController {

    private final CodingTestService codingTestService;
    private final UserRepository userRepository;

    private ResponseEntity<?> requirePlacementCell(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (user == null || user.getRole() != Role.PLACEMENT_CELL) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "FORBIDDEN", "message", "Only the Placement Cell can perform this action."));
        }
        return null;
    }

    @PostMapping("/publish")
    public ResponseEntity<?> publish(@RequestBody PublishCodingTestRequest request, Authentication authentication) {
        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
        if (forbidden != null) return forbidden;
        return ResponseEntity.ok(codingTestService.publishTest(request, authentication.getName()));
    }

    /** Every test this placement cell (or any) has published, with quick stats --
     * powers the "all tests" dashboard so nobody has to remember/paste a test ID. */
    @GetMapping
    public ResponseEntity<?> listAllTests(Authentication authentication) {
        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
        if (forbidden != null) return forbidden;
        return ResponseEntity.ok(codingTestService.listAllTests());
    }

    /** Full question review for a test, including hidden test cases (the placement
     * cell is allowed to see everything; students never see hidden cases). */
    @GetMapping("/{testId}/questions")
    public ResponseEntity<?> listQuestions(@PathVariable Long testId, Authentication authentication) {
        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
        if (forbidden != null) return forbidden;
        return ResponseEntity.ok(codingTestService.listQuestionsForTest(testId));
    }

    /** All pending resume requests across every test, each carrying the violation screenshot. */
    @GetMapping("/violations")
    public ResponseEntity<?> pendingViolations(@RequestParam(required = false) Long testId, Authentication authentication) {
        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
        if (forbidden != null) return forbidden;
        return ResponseEntity.ok(codingTestService.listPendingResumeRequests(testId));
    }

    /** The only place a resume can be granted or denied. Students cannot call this. */
    @PostMapping("/assignments/{assignmentId}/resume-decision")
    public ResponseEntity<?> decideResume(@PathVariable Long assignmentId,
                                          @RequestBody ResumeDecisionRequest request,
                                          Authentication authentication) {
        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
        if (forbidden != null) return forbidden;
        return ResponseEntity.ok(codingTestService.decideResume(assignmentId, request.isApprove(), authentication.getName()));
    }

    @GetMapping("/{testId}/results")
    public ResponseEntity<?> results(@PathVariable Long testId, Authentication authentication) {
        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
        if (forbidden != null) return forbidden;
        return ResponseEntity.ok(codingTestService.listResults(testId));
    }

    @PostMapping("/{testId}/publish-results")
    public ResponseEntity<?> publishResults(@PathVariable Long testId, Authentication authentication) {
        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
        if (forbidden != null) return forbidden;
        codingTestService.setResultsPublished(testId, true);
        return ResponseEntity.ok(Map.of("testId", testId, "resultsPublished", true));
    }

    @PostMapping("/{testId}/unpublish-results")
    public ResponseEntity<?> unpublishResults(@PathVariable Long testId, Authentication authentication) {
        ResponseEntity<?> forbidden = requirePlacementCell(authentication);
        if (forbidden != null) return forbidden;
        codingTestService.setResultsPublished(testId, false);
        return ResponseEntity.ok(Map.of("testId", testId, "resultsPublished", false));
    }


}