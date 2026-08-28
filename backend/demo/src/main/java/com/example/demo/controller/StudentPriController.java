//package com.example.demo.controller;
//
//import com.example.demo.Service.StudentPriService;
//import com.example.demo.dto.pri.PriResponse;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/student/pri")
//@CrossOrigin(origins = "http://localhost:5173")
//public class StudentPriController {
//
//    private final StudentPriService priService;
//
//    public StudentPriController(
//            StudentPriService priService
//    ) {
//        this.priService = priService;
//    }
//
//    @GetMapping
//    public ResponseEntity<PriResponse> getPRI(
//            @RequestParam(required = false) Long studentId
//    ) {
//
//        /*
//         * If your JWT already contains student ID,
//         * replace this with the authenticated user's ID.
//         *
//         * For now:
//         */
//        Long id = studentId != null
//                ? studentId
//                : 1L;
//
//        return ResponseEntity.ok(
//                priService.calculatePRI(id)
//        );
//    }
//
//
//}