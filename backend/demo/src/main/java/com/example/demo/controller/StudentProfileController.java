package com.example.demo.controller;

import com.example.demo.entity.StudentProfile;
import com.example.demo.Service.StudentProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    public StudentProfileController(
            StudentProfileService studentProfileService
    ) {
        this.studentProfileService = studentProfileService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(
            @RequestParam Long userId
    ) {

        StudentProfile profile =
                studentProfileService.getProfile(userId);

        if (profile == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> saveProfile(
            @RequestParam Long userId,
            @RequestBody StudentProfile profile
    ) {

        StudentProfile saved =
                studentProfileService.saveProfile(
                        userId,
                        profile
                );

        return ResponseEntity.ok(saved);
    }
}