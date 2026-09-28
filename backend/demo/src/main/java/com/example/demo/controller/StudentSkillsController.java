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
//    public StudentSkillsController(
//            StudentPriService priService
//    ) {
//        this.priService = priService;
//    }
//
//    @GetMapping
//    public ResponseEntity<PriResponse> getSkills(
//            @RequestParam Long studentId
//    ) {
//
//        System.out.println(
//                "Calculating PRI for studentId = "
//                        + studentId
//        );
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

    /*
     * ============================================================
     * GET PRI USING STUDENT PROFILE ID
     * ============================================================
     *
     * Example:
     *
     * /api/student/skills?studentId=5
     *
     * Here 5 means:
     *
     * student_profile.id = 5
     */
    @GetMapping
    public ResponseEntity<PriResponse> getSkills(
            @RequestParam(required = false) Long studentId,
            @RequestParam(required = false) Long userId
    ) {

        System.out.println(
                "PRI request received. studentId = "
                        + studentId
                        + ", userId = "
                        + userId
        );

        /*
         * --------------------------------------------------------
         * STUDENT PROFILE ID
         * --------------------------------------------------------
         */

        if (studentId != null) {

            PriResponse response =
                    priService.calculatePRI(studentId);

            return ResponseEntity.ok(response);
        }

        /*
         * --------------------------------------------------------
         * USER ID
         * --------------------------------------------------------
         */

        if (userId != null) {

            PriResponse response =
                    priService.calculatePRIByUserId(userId);

            return ResponseEntity.ok(response);
        }

        /*
         * --------------------------------------------------------
         * NO ID PROVIDED
         * --------------------------------------------------------
         */

        throw new IllegalArgumentException(
                "Either studentId or userId must be provided."
        );
    }
}