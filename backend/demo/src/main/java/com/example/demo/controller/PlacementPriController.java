package com.example.demo.controller;

import com.example.demo.Service.StudentPriService;
import com.example.demo.dto.pri.PriResponse;
import com.example.demo.entity.StudentProfile;
import com.example.demo.repository.StudentProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/placement")
@CrossOrigin(origins = "http://localhost:5173")
public class PlacementPriController {

    private final StudentPriService priService;
    private final StudentProfileRepository studentProfileRepository;

    public PlacementPriController(
            StudentPriService priService,
            StudentProfileRepository studentProfileRepository
    ) {
        this.priService = priService;
        this.studentProfileRepository = studentProfileRepository;
    }

    /**
     * Get the current PRI of every student.
     *
     * IMPORTANT:
     * This does NOT calculate another PRI.
     *
     * It uses the same StudentPriService that is already
     * used by StudentSkillsController.
     */
    @GetMapping("/students/pri")
    public ResponseEntity<List<PlacementStudentPriResponse>> getAllStudentPRI() {

        List<StudentProfile> students =
                studentProfileRepository.findAll();

        List<PlacementStudentPriResponse> result =
                new ArrayList<>();

        for (StudentProfile student : students) {

            try {

                Long studentId = student.getId();

                System.out.println(
                        "Calculating placement PRI for studentId = "
                                + studentId
                );

                /*
                 * SAME PRI CALCULATION USED BY STUDENT SKILLS
                 */
                PriResponse pri =
                        priService.calculatePRI(studentId);

                PlacementStudentPriResponse response =
                        new PlacementStudentPriResponse();

                /*
                 * Student profile ID
                 */
                response.setStudentId(studentId);

                /*
                 * Dynamic PRI
                 */
                response.setPriScore(
                        pri.getOverallScore()
                );

                /*
                 * Existing PRI level
                 */
                response.setLevel(
                        pri.getLevel()
                );

                /*
                 * Existing placement readiness
                 */
                response.setPlacementReady(
                        pri.isPlacementReady()
                );

                /*
                 * Existing assessment counts
                 */
                response.setTotalTests(
                        pri.getTotalTests()
                );

                response.setAptitudeTests(
                        pri.getAptitudeTests()
                );

                response.setCodingTests(
                        pri.getCodingTests()
                );

                result.add(response);

            } catch (Exception e) {

                System.out.println(
                        "Could not calculate PRI for studentId = "
                                + student.getId()
                );

                System.out.println(
                        "Reason: "
                                + e.getMessage()
                );
            }
        }

        return ResponseEntity.ok(result);
    }
}