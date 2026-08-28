////////package com.example.demo.controller;
////////
////////import com.example.demo.Service.StudentExternalProfileService;
////////import com.example.demo.dto.external.ExternalProfileRequest;
////////import com.example.demo.dto.external.ExternalProfileResponse;
////////import org.springframework.http.ResponseEntity;
////////import org.springframework.web.bind.annotation.*;
////////
////////@RestController
////////@RequestMapping("/api/student/external-profiles")
////////@CrossOrigin(origins = "http://localhost:5173")
////////public class StudentExternalProfileController {
////////
////////    private final StudentExternalProfileService service;
////////
////////    public StudentExternalProfileController(
////////            StudentExternalProfileService service
////////    ) {
////////        this.service = service;
////////    }
////////
////////    // =========================================================
////////    // GET
////////    // =========================================================
////////
////////    @GetMapping
////////    public ResponseEntity<ExternalProfileResponse> getProfile(
////////            @RequestParam(required = false) Long userId
////////    ) {
////////
////////        /*
////////         * Temporary:
////////         * use userId from request.
////////         *
////////         * Later replace with JWT authenticated user.
////////         */
////////
////////        Long id = userId != null
////////                ? userId
////////                : 1L;
////////
////////        return ResponseEntity.ok(
////////                service.getProfile(id)
////////        );
////////    }
////////
////////    // =========================================================
////////    // SAVE
////////    // =========================================================
////////
////////    @PutMapping
////////    public ResponseEntity<ExternalProfileResponse> saveProfile(
////////            @RequestBody ExternalProfileRequest request,
////////            @RequestParam(required = false) Long userId
////////    ) {
////////
////////        Long id = userId != null
////////                ? userId
////////                : 1L;
////////
////////        return ResponseEntity.ok(
////////                service.saveProfile(id, request)
////////        );
////////    }
////////
////////    // =========================================================
////////    // REFRESH
////////    // =========================================================
////////
////////    @PostMapping("/refresh")
////////    public ResponseEntity<ExternalProfileResponse> refresh(
////////            @RequestParam(required = false) Long userId
////////    ) {
////////
////////        Long id = userId != null
////////                ? userId
////////                : 1L;
////////
////////        return ResponseEntity.ok(
////////                service.refreshProfile(id)
////////        );
////////    }
////////}
//////
//////package com.example.demo.controller;
//////
//////import com.example.demo.Service.StudentExternalProfileService;
//////import com.example.demo.dto.external.ExternalProfileRequest;
//////import com.example.demo.dto.external.ExternalProfileResponse;
//////import org.springframework.http.ResponseEntity;
//////import org.springframework.web.bind.annotation.*;
//////
//////@RestController
//////@RequestMapping("/api/student/external-profiles")
//////@CrossOrigin(origins = "http://localhost:5173")
//////public class StudentExternalProfileController {
//////
//////    private final StudentExternalProfileService service;
//////
//////    public StudentExternalProfileController(
//////            StudentExternalProfileService service
//////    ) {
//////        this.service = service;
//////    }
//////
//////    // =========================================================
//////    // GET
//////    // =========================================================
//////
//////    @GetMapping
//////    public ResponseEntity<ExternalProfileResponse> getProfile(
//////            @RequestParam(required = false) Long userId
//////    ) {
//////
//////        if (userId == null) {
//////            return ResponseEntity.badRequest().build();
//////        }
//////
//////        return ResponseEntity.ok(
//////                service.getProfile(userId)
//////        );
//////    }
//////
//////    // =========================================================
//////    // SAVE
//////    // =========================================================
//////
//////    @PutMapping
//////    public ResponseEntity<ExternalProfileResponse> saveProfile(
//////            @RequestBody ExternalProfileRequest request,
//////            @RequestParam(required = false) Long userId
//////    ) {
//////
//////        if (userId == null) {
//////            return ResponseEntity.badRequest().build();
//////        }
//////
//////        return ResponseEntity.ok(
//////                service.saveProfile(userId, request)
//////        );
//////    }
//////
//////    // =========================================================
//////    // REFRESH
//////    // =========================================================
//////
//////    @PostMapping("/refresh")
//////    public ResponseEntity<ExternalProfileResponse> refresh(
//////            @RequestParam(required = false) Long userId
//////    ) {
//////
//////        if (userId == null) {
//////            return ResponseEntity.badRequest().build();
//////        }
//////
//////        return ResponseEntity.ok(
//////                service.refreshProfile(userId)
//////        );
//////    }
//////}
////
////package com.example.demo.controller;
////
////import com.example.demo.Service.StudentExternalProfileService;
////import com.example.demo.dto.external.ExternalProfileRequest;
////import com.example.demo.dto.external.ExternalProfileResponse;
////import org.springframework.http.ResponseEntity;
////import org.springframework.web.bind.annotation.*;
////
////@RestController
////@RequestMapping("/api/student/external-profiles")
////@CrossOrigin(origins = "http://localhost:5173")
////public class StudentExternalProfileController {
////
////    private final StudentExternalProfileService service;
////
////    public StudentExternalProfileController(
////            StudentExternalProfileService service
////    ) {
////        this.service = service;
////    }
////
////    // =========================================================
////    // GET
////    // =========================================================
////
////    @GetMapping
////    public ResponseEntity<ExternalProfileResponse> getProfile(
////            @RequestParam Long userId
////    ) {
////
////        return ResponseEntity.ok(
////                service.getProfile(userId)
////        );
////    }
////
////    // =========================================================
////    // SAVE
////    // =========================================================
////
////    @PutMapping
////    public ResponseEntity<ExternalProfileResponse> saveProfile(
////            @RequestBody ExternalProfileRequest request,
////            @RequestParam Long userId
////    ) {
////
////        return ResponseEntity.ok(
////                service.saveProfile(userId, request)
////        );
////    }
////
////    // =========================================================
////    // REFRESH
////    // =========================================================
////
////    @PostMapping("/refresh")
////    public ResponseEntity<ExternalProfileResponse> refresh(
////            @RequestParam Long userId
////    ) {
////
////        return ResponseEntity.ok(
////                service.refreshProfile(userId)
////        );
////    }
////}
//
//package com.example.demo.controller;
//
//import com.example.demo.Service.StudentExternalProfileService;
//import com.example.demo.entity.StudentProfile;
//import com.example.demo.repository.StudentProfileRepository;
//import lombok.Data;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/student/external-profiles")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:5173")
//public class StudentExternalProfileController {
//
//    private final StudentExternalProfileService service;
//
//    private final StudentProfileRepository studentProfileRepository;
//
//    // ============================================================
//    // GET
//    // ============================================================
//
//    @GetMapping
//    public ResponseEntity<?> getProfile(
//            @RequestParam Long userId
//    ) {
//
//        StudentProfile profile =
//                service.getProfile(userId);
//
//        return ResponseEntity.ok(
//                new ExternalProfileResponse(
//                        profile.getGithubUsername(),
//                        profile.getLeetcodeUsername()
//                )
//        );
//    }
//
//    // ============================================================
//    // PUT
//    // ============================================================
//
//    @PutMapping
//    public ResponseEntity<?> saveProfile(
//            @RequestParam Long userId,
//            @RequestBody ExternalProfileRequest request
//    ) {
//
//        StudentProfile profile =
//                service.saveExternalProfiles(
//                        userId,
//                        request.getGithubUsername(),
//                        request.getLeetcodeUsername()
//                );
//
//        return ResponseEntity.ok(
//                new ExternalProfileResponse(
//                        profile.getGithubUsername(),
//                        profile.getLeetcodeUsername()
//                )
//        );
//    }
//
//    @PostMapping("/refresh")
//    public ResponseEntity<?> refreshExternalProfile(
//            @RequestParam Long userId
//    ) {
//
//        StudentProfile profile =
//                studentProfileRepository
//                        .findByUserId(userId)
//                        .orElse(null);
//
//        if (profile == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        Map<String, Object> response = new HashMap<>();
//
//        response.put(
//                "githubUsername",
//                profile.getGithubUsername()
//        );
//
//        response.put(
//                "leetcodeUsername",
//                profile.getLeetcodeUsername()
//        );
//
//        response.put("github", null);
//        response.put("leetcode", null);
//
//        return ResponseEntity.ok(response);
//    }
//
//    // ============================================================
//    // DTO
//    // ============================================================
//
//    @Data
//    public static class ExternalProfileRequest {
//
//        private String githubUsername;
//
//        private String leetcodeUsername;
//    }
//
//    @Data
//    public static class ExternalProfileResponse {
//
//        private String githubUsername;
//
//        private String leetcodeUsername;
//
//        public ExternalProfileResponse(
//                String githubUsername,
//                String leetcodeUsername
//        ) {
//            this.githubUsername = githubUsername;
//            this.leetcodeUsername = leetcodeUsername;
//        }
//    }
//}

package com.example.demo.controller;

import com.example.demo.Service.StudentExternalProfileService;
import com.example.demo.dto.external.ExternalProfileRequest;
import com.example.demo.dto.external.ExternalProfileResponse;
import com.example.demo.entity.StudentProfile;
import com.example.demo.repository.StudentProfileRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/external-profiles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StudentExternalProfileController {

    private final StudentExternalProfileService service;

    private final StudentProfileRepository studentProfileRepository;


    // ============================================================
    // GET
    // ============================================================

    @GetMapping
    public ResponseEntity<ExternalProfileResponse> getProfile(
            @RequestParam Long userId
    ) {

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(userId)
                        .orElse(null);

        if (profile == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                service.buildExternalProfileResponse(profile)
        );
    }


    // ============================================================
    // SAVE USERNAMES
    // ============================================================

    @PutMapping
    public ResponseEntity<ExternalProfileResponse> saveProfile(
            @RequestParam Long userId,
            @RequestBody ExternalProfileRequest request
    ) {

        StudentProfile profile =
                service.saveExternalProfiles(
                        userId,
                        request.getGithubUsername(),
                        request.getLeetcodeUsername()
                );

        return ResponseEntity.ok(
                service.buildExternalProfileResponse(profile)
        );
    }


    // ============================================================
    // REFRESH GITHUB + LEETCODE
    // ============================================================

    @PostMapping("/refresh")
    public ResponseEntity<ExternalProfileResponse> refreshExternalProfile(
            @RequestParam Long userId
    ) {

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(userId)
                        .orElse(null);

        if (profile == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                service.refreshProfile(userId)
        );
    }
}