////package com.example.demo.controller;
////
////import com.example.demo.Service.StudentPriService;
////import com.example.demo.dto.pri.PriResponse;
////import org.springframework.http.ResponseEntity;
////import org.springframework.web.bind.annotation.*;
////
////@RestController
////@RequestMapping("/api/student/skills")
////@CrossOrigin(origins = "http://localhost:5173")
////public class StudentSkillsController {
////
////    private final StudentPriService priService;
////
////    public StudentSkillsController(
////            StudentPriService priService
////    ) {
////        this.priService = priService;
////    }
////
////    @GetMapping
////    public ResponseEntity<PriResponse> getSkills(
////            @RequestParam(required = false) Long studentId
////    ) {
////
////        Long id = studentId != null
////                ? studentId
////                : 1L;
////
////        return ResponseEntity.ok(
////                priService.calculatePRI(id)
////        );
////    }
////}
//
//package com.example.demo.controller;
//
//import com.example.demo.Service.StudentPriService;
//import com.example.demo.dto.pri.PriResponse;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/student/skills")
//@CrossOrigin(origins = "http://localhost:5173")
//public class StudentSkillsController {
//
//    private final StudentPriService priService;
//
//    public StudentSkillsController(StudentPriService priService) {
//        this.priService = priService;
//    }
//
//    @GetMapping
//    public ResponseEntity<PriResponse> getSkills(
//            @RequestParam Long studentId
//    ) {
//
//        PriResponse response =
//                priService.calculatePRI(studentId);
//
//        return ResponseEntity.ok(response);
//    }
//}

package com.example.demo.controller;

import com.example.demo.Service.StudentPriService;
import com.example.demo.dto.pri.PriResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/skills")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentSkillsController {

    private final StudentPriService priService;

    public StudentSkillsController(
            StudentPriService priService
    ) {
        this.priService = priService;
    }

    @GetMapping
    public ResponseEntity<PriResponse> getSkills(
            @RequestParam Long studentId
    ) {

        System.out.println(
                "Calculating PRI for studentId = "
                        + studentId
        );

        PriResponse response =
                priService.calculatePRI(studentId);

        return ResponseEntity.ok(response);
    }
}