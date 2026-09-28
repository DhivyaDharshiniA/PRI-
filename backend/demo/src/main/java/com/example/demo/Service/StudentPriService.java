//package com.example.demo.Service;
//
//import com.example.demo.dto.pri.PriDimensionResponse;
//import com.example.demo.dto.pri.PriRecommendationResponse;
//import com.example.demo.dto.pri.PriResponse;
//import com.example.demo.dto.pri.PriScoreResponse;
//import com.example.demo.dto.pri.PriRoadmapStepResponse;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.Comparator;
//import java.util.List;
//
//@Service
//public class StudentPriService {
//
//    /*
//     * PRI WEIGHTS
//     *
//     * Total = 100%
//     */
//    private static final double APTITUDE_WEIGHT = 0.15;
//    private static final double TECHNICAL_WEIGHT = 0.20;
//    private static final double CODING_WEIGHT = 0.20;
//    private static final double COMMUNICATION_WEIGHT = 0.15;
//    private static final double GIT_WEIGHT = 0.10;
//    private static final double UPSKILLING_WEIGHT = 0.10;
//    private static final double CONSISTENCY_WEIGHT = 0.10;
//
//    public PriResponse calculatePRI(Long studentId) {
//
//        /*
//         * ------------------------------------------------------------
//         * IMPORTANT
//         * ------------------------------------------------------------
//         *
//         * These values are placeholders for dimensions that are not
//         * yet connected to your database.
//         *
//         * Aptitude and Coding can be replaced with your actual
//         * repositories/services.
//         */
//
//        double aptitude = getAptitudeScore(studentId);
//
//        double technical = getTechnicalScore(studentId);
//
//        double coding = getCodingScore(studentId);
//
//        double communication = getCommunicationScore(studentId);
//
//        double git = getGitScore(studentId);
//
//        double upskilling = getUpskillingScore(studentId);
//
//        double consistency = getConsistencyScore(studentId);
//
//        /*
//         * ------------------------------------------------------------
//         * CALCULATE PRI
//         * ------------------------------------------------------------
//         */
//
//        double pri =
//                aptitude * APTITUDE_WEIGHT
//                        + technical * TECHNICAL_WEIGHT
//                        + coding * CODING_WEIGHT
//                        + communication * COMMUNICATION_WEIGHT
//                        + git * GIT_WEIGHT
//                        + upskilling * UPSKILLING_WEIGHT
//                        + consistency * CONSISTENCY_WEIGHT;
//
//        pri = Math.round(pri * 10.0) / 10.0;
//
//        PriResponse response = new PriResponse();
//
//        response.setOverallScore(pri);
//        response.setTargetScore(80);
//        response.setPlacementReady(pri >= 80);
//        response.setLevel(getLevel(pri));
//
//        List<PriDimensionResponse> dimensions =
//                buildDimensions(
//                        aptitude,
//                        technical,
//                        coding,
//                        communication,
//                        git,
//                        upskilling,
//                        consistency
//                );
//
//        response.setDimensions(dimensions);
//
//        response.setTotalTests(
//                getTotalTests(studentId)
//        );
//
//        response.setAptitudeTests(
//                getAptitudeTestCount(studentId)
//        );
//
//        response.setCodingTests(
//                getCodingTestCount(studentId)
//        );
//
//        response.setRoadmap(
//                buildRoadmap(dimensions)
//        );
//
//        response.setRecommendations(
//                buildRecommendations(dimensions)
//        );
//
//        return response;
//    }
//
//    /*
//     * ============================================================
//     * DIMENSIONS
//     * ============================================================
//     */
//
//    private List<PriDimensionResponse> buildDimensions(
//            double aptitude,
//            double technical,
//            double coding,
//            double communication,
//            double git,
//            double upskilling,
//            double consistency
//    ) {
//
//        List<PriDimensionResponse> list =
//                new ArrayList<>();
//
//        list.add(new PriDimensionResponse(
//                "aptitude",
//                "Aptitude",
//                aptitude,
//                APTITUDE_WEIGHT
//        ));
//
//        list.add(new PriDimensionResponse(
//                "technical",
//                "Technical Knowledge",
//                technical,
//                TECHNICAL_WEIGHT
//        ));
//
//        list.add(new PriDimensionResponse(
//                "coding",
//                "Coding",
//                coding,
//                CODING_WEIGHT
//        ));
//
//        list.add(new PriDimensionResponse(
//                "communication",
//                "Communication",
//                communication,
//                COMMUNICATION_WEIGHT
//        ));
//
//        list.add(new PriDimensionResponse(
//                "git",
//                "Git / GitHub",
//                git,
//                GIT_WEIGHT
//        ));
//
//        list.add(new PriDimensionResponse(
//                "upskilling",
//                "Upskilling",
//                upskilling,
//                UPSKILLING_WEIGHT
//        ));
//
//        list.add(new PriDimensionResponse(
//                "consistency",
//                "Consistency",
//                consistency,
//                CONSISTENCY_WEIGHT
//        ));
//
//        return list;
//    }
//
//    /*
//     * ============================================================
//     * ROADMAP
//     * ============================================================
//     */
//
//    private List<PriRoadmapStepResponse> buildRoadmap(
//            List<PriDimensionResponse> dimensions
//    ) {
//
//        List<PriRoadmapStepResponse> steps =
//                new ArrayList<>();
//
//        PriDimensionResponse aptitude =
//                find(dimensions, "aptitude");
//
//        PriDimensionResponse coding =
//                find(dimensions, "coding");
//
//        PriDimensionResponse technical =
//                find(dimensions, "technical");
//
//        PriDimensionResponse communication =
//                find(dimensions, "communication");
//
//        PriDimensionResponse git =
//                find(dimensions, "git");
//
//        PriDimensionResponse consistency =
//                find(dimensions, "consistency");
//
//        steps.add(new PriRoadmapStepResponse(
//                1,
//                "Aptitude Foundation",
//                getRoadmapDescription(
//                        aptitude,
//                        "Complete aptitude assessments"
//                ),
//                getStatus(aptitude.getScore(), 70),
//                aptitude.getScore(),
//                70
//        ));
//
//        steps.add(new PriRoadmapStepResponse(
//                2,
//                "Coding Practice",
//                getRoadmapDescription(
//                        coding,
//                        "Complete coding assessments"
//                ),
//                getStatus(coding.getScore(), 70),
//                coding.getScore(),
//                70
//        ));
//
//        steps.add(new PriRoadmapStepResponse(
//                3,
//                "Technical Growth",
//                getRoadmapDescription(
//                        technical,
//                        "Strengthen technical fundamentals"
//                ),
//                getStatus(technical.getScore(), 75),
//                technical.getScore(),
//                75
//        ));
//
//        steps.add(new PriRoadmapStepResponse(
//                4,
//                "Professional Skills",
//                getRoadmapDescription(
//                        communication,
//                        "Improve communication and interview skills"
//                ),
//                getStatus(communication.getScore(), 75),
//                communication.getScore(),
//                75
//        ));
//
//        steps.add(new PriRoadmapStepResponse(
//                5,
//                "Developer Profile",
//                getRoadmapDescription(
//                        git,
//                        "Build a strong GitHub profile"
//                ),
//                getStatus(git.getScore(), 70),
//                git.getScore(),
//                70
//        ));
//
//        steps.add(new PriRoadmapStepResponse(
//                6,
//                "Consistency",
//                getRoadmapDescription(
//                        consistency,
//                        "Practice consistently every week"
//                ),
//                getStatus(consistency.getScore(), 75),
//                consistency.getScore(),
//                75
//        ));
//
//        return steps;
//    }
//
//    private String getRoadmapDescription(
//            PriDimensionResponse dimension,
//            String defaultText
//    ) {
//
//        if (dimension.getScore() >= 75) {
//            return "Target achieved";
//        }
//
//        if (dimension.getScore() >= 60) {
//            return "Almost there — keep improving";
//        }
//
//        return defaultText;
//    }
//
//    private String getStatus(
//            double score,
//            double target
//    ) {
//
//        if (score >= target) {
//            return "COMPLETED";
//        }
//
//        if (score >= target - 15) {
//            return "CURRENT";
//        }
//
//        return "UPCOMING";
//    }
//
//    /*
//     * ============================================================
//     * RECOMMENDATIONS
//     * ============================================================
//     */
//
//    private List<PriRecommendationResponse>
//    buildRecommendations(
//            List<PriDimensionResponse> dimensions
//    ) {
//
//        List<PriRecommendationResponse> result =
//                new ArrayList<>();
//
//        dimensions.stream()
//                .sorted(
//                        Comparator.comparingDouble(
//                                PriDimensionResponse::getScore
//                        )
//                )
//                .limit(3)
//                .forEach(dimension -> {
//
//                    String key =
//                            dimension.getKey();
//
//                    switch (key) {
//
//                        case "aptitude":
//                            result.add(
//                                    new PriRecommendationResponse(
//                                            "Aptitude",
//                                            dimension.getScore(),
//                                            "Improve Aptitude",
//                                            "Strengthen quantitative, logical and verbal reasoning.",
//                                            "Practice Aptitude",
//                                            "/student/aptitude-tests"
//                                    )
//                            );
//                            break;
//
//                        case "technical":
//                            result.add(
//                                    new PriRecommendationResponse(
//                                            "Technical Knowledge",
//                                            dimension.getScore(),
//                                            "Strengthen Technical Knowledge",
//                                            "Revise core CS concepts and complete technical assessments.",
//                                            "Start Practice",
//                                            "/student/aptitude-tests"
//                                    )
//                            );
//                            break;
//
//                        case "coding":
//                            result.add(
//                                    new PriRecommendationResponse(
//                                            "Coding",
//                                            dimension.getScore(),
//                                            "Improve Coding",
//                                            "Solve more programming problems and coding assessments.",
//                                            "Practice Coding",
//                                            "/student/coding-tests"
//                                    )
//                            );
//                            break;
//
//                        case "communication":
//                            result.add(
//                                    new PriRecommendationResponse(
//                                            "Communication",
//                                            dimension.getScore(),
//                                            "Improve Communication",
//                                            "Practice vocabulary, grammar and interview communication.",
//                                            "Improve Skills",
//                                            "/student/skills"
//                                    )
//                            );
//                            break;
//
//                        case "git":
//                            result.add(
//                                    new PriRecommendationResponse(
//                                            "Git / GitHub",
//                                            dimension.getScore(),
//                                            "Build Your GitHub Profile",
//                                            "Create projects and maintain consistent repository activity.",
//                                            "View Skills",
//                                            "/student/skills"
//                                    )
//                            );
//                            break;
//
//                        case "upskilling":
//                            result.add(
//                                    new PriRecommendationResponse(
//                                            "Upskilling",
//                                            dimension.getScore(),
//                                            "Continue Upskilling",
//                                            "Complete courses, certifications and practical projects.",
//                                            "View Roadmap",
//                                            "/student/roadmap"
//                                    )
//                            );
//                            break;
//
//                        case "consistency":
//                            result.add(
//                                    new PriRecommendationResponse(
//                                            "Consistency",
//                                            dimension.getScore(),
//                                            "Improve Consistency",
//                                            "Practice regularly and maintain weekly learning activity.",
//                                            "View Roadmap",
//                                            "/student/roadmap"
//                                    )
//                            );
//                            break;
//                    }
//                });
//
//        return result;
//    }
//
//    /*
//     * ============================================================
//     * LEVEL
//     * ============================================================
//     */
//
//    private String getLevel(double score) {
//
//        if (score < 40)
//            return "NEEDS_FOUNDATION";
//
//        if (score < 60)
//            return "BEGINNER";
//
//        if (score < 70)
//            return "DEVELOPING";
//
//        if (score < 80)
//            return "PLACEMENT_FOCUSED";
//
//        if (score < 90)
//            return "PLACEMENT_READY";
//
//        return "HIGHLY_READY";
//    }
//
//    private PriDimensionResponse find(
//            List<PriDimensionResponse> dimensions,
//            String key
//    ) {
//
//        return dimensions.stream()
//                .filter(d -> d.getKey().equals(key))
//                .findFirst()
//                .orElseThrow();
//    }
//
//    /*
//     * ============================================================
//     * TEMPORARY DATA PROVIDERS
//     *
//     * Replace these with repository/service calls.
//     * ============================================================
//     */
//
//    private double getAptitudeScore(Long studentId) {
//        return 78;
//    }
//
//    private double getTechnicalScore(Long studentId) {
//        return 65;
//    }
//
//    private double getCodingScore(Long studentId) {
//        return 82;
//    }
//
//    private double getCommunicationScore(Long studentId) {
//        return 70;
//    }
//
//    private double getGitScore(Long studentId) {
//        return 60;
//    }
//
//    private double getUpskillingScore(Long studentId) {
//        return 75;
//    }
//
//    private double getConsistencyScore(Long studentId) {
//        return 68;
//    }
//
//    private int getTotalTests(Long studentId) {
//        return 8;
//    }
//
//    private int getAptitudeTestCount(Long studentId) {
//        return 5;
//    }
//
//    private int getCodingTestCount(Long studentId) {
//        return 3;
//    }
//}

package com.example.demo.Service;

import com.example.demo.dto.external.GithubResponse;
import com.example.demo.dto.pri.PriDimensionResponse;
import com.example.demo.dto.pri.PriRecommendationResponse;
import com.example.demo.dto.pri.PriResponse;
import com.example.demo.dto.pri.PriRoadmapStepResponse;
import com.example.demo.entity.StudentProfile;
import com.example.demo.entity.aptitude.TestAssignment;
import com.example.demo.entity.coding.CodingTestAssignment;
import com.example.demo.repository.CodingTestAssignmentRepository;
import com.example.demo.repository.StudentProfileRepository;
import com.example.demo.repository.TestAssignmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class StudentPriService {

    /*
     * ============================================================
     * PRI WEIGHTS
     * ============================================================
     *
     * Aptitude          = 15%
     * Technical         = 20%
     * Coding            = 20%
     * Communication     = 15%
     * Git / GitHub      = 10%
     * Upskilling        = 10%
     * Consistency       = 10%
     *
     * Total             = 100%
     */

    private static final double APTITUDE_WEIGHT = 0.15;
    private static final double TECHNICAL_WEIGHT = 0.20;
    private static final double CODING_WEIGHT = 0.20;
    private static final double COMMUNICATION_WEIGHT = 0.15;
    private static final double GIT_WEIGHT = 0.10;
    private static final double UPSKILLING_WEIGHT = 0.10;
    private static final double CONSISTENCY_WEIGHT = 0.10;

    private final StudentProfileRepository studentProfileRepository;
    private final TestAssignmentRepository testAssignmentRepository;
    private final CodingTestAssignmentRepository codingTestAssignmentRepository;
    private final GithubService githubService;

    public StudentPriService(
            StudentProfileRepository studentProfileRepository,
            TestAssignmentRepository testAssignmentRepository,
            CodingTestAssignmentRepository codingTestAssignmentRepository,
            GithubService githubService
    ) {
        this.studentProfileRepository = studentProfileRepository;
        this.testAssignmentRepository = testAssignmentRepository;
        this.codingTestAssignmentRepository = codingTestAssignmentRepository;
        this.githubService = githubService;
    }

    /*
     * ============================================================
     * MAIN PRI CALCULATION
     * ============================================================
     */

    public PriResponse calculatePRI(Long studentId) {

        /*
         * --------------------------------------------------------
         * 1. FIND STUDENT PROFILE
         * --------------------------------------------------------
         */

        StudentProfile profile =
                studentProfileRepository.findById(studentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student profile not found for ID: "
                                                + studentId
                                )
                        );

        /*
         * --------------------------------------------------------
         * 2. CHECK USER LINK
         * --------------------------------------------------------
         */

        if (profile.getUser() == null) {
            throw new RuntimeException(
                    "Student profile is not linked to a user."
            );
        }

        /*
         * --------------------------------------------------------
         * 3. BUILD STUDENT IDENTIFIERS
         * --------------------------------------------------------
         *
         * TestAssignment and CodingTestAssignment contain:
         *
         * studentUsername
         *
         * Depending on how the assignment was created in your
         * application, this value may contain:
         *
         * - register number
         * - email
         *
         * Therefore we query using both.
         */

        Set<String> identifierSet =
                new LinkedHashSet<>();

        String registerNumber =
                profile.getUser().getRegisterNumber();

        String email =
                profile.getUser().getEmail();

        if (registerNumber != null &&
                !registerNumber.isBlank()) {

            identifierSet.add(
                    registerNumber.trim()
            );
        }

        if (email != null &&
                !email.isBlank()) {

            identifierSet.add(
                    email.trim()
            );
        }

        if (identifierSet.isEmpty()) {
            throw new RuntimeException(
                    "Student does not have a register number or email."
            );
        }

        List<String> identifiers =
                new ArrayList<>(identifierSet);

        /*
         * --------------------------------------------------------
         * 4. FETCH REAL COMPLETED APTITUDE TESTS
         * --------------------------------------------------------
         */

        List<TestAssignment> aptitudeTests =
                testAssignmentRepository
                        .findCompletedTestsByUsernames(
                                identifiers
                        );

        /*
         * --------------------------------------------------------
         * 5. FETCH REAL COMPLETED CODING TESTS
         * --------------------------------------------------------
         */

        List<CodingTestAssignment> codingTests =
                codingTestAssignmentRepository
                        .findCompletedTestsByUsernames(
                                identifiers
                        );

        /*
         * --------------------------------------------------------
         * 6. CALCULATE APTITUDE
         * --------------------------------------------------------
         */

        double aptitude =
                calculateAptitudeScore(
                        aptitudeTests
                );

        /*
         * --------------------------------------------------------
         * 7. CALCULATE CODING
         * --------------------------------------------------------
         */

        double coding =
                calculateCodingScore(
                        codingTests
                );

        /*
         * --------------------------------------------------------
         * 8. OTHER DIMENSIONS
         * --------------------------------------------------------
         *
         * These are kept at 0 until actual database sources are
         * connected.
         *
         * No fake/static scores are used.
         */

        double technical = 0;

        double communication = 0;

        double upskilling = 0;

        /*
         * --------------------------------------------------------
         * 9. GITHUB
         * --------------------------------------------------------
         */

        double git =
                calculateGithubScore(
                        profile
                );

        /*
         * --------------------------------------------------------
         * 10. CONSISTENCY
         * --------------------------------------------------------
         *
         * Calculated from actual completed aptitude and coding
         * assessments.
         */

        double consistency =
                calculateConsistency(
                        aptitudeTests,
                        codingTests
                );

        /*
         * --------------------------------------------------------
         * 11. FINAL PRI
         * --------------------------------------------------------
         */

        double pri =
                aptitude * APTITUDE_WEIGHT
                        + technical * TECHNICAL_WEIGHT
                        + coding * CODING_WEIGHT
                        + communication * COMMUNICATION_WEIGHT
                        + git * GIT_WEIGHT
                        + upskilling * UPSKILLING_WEIGHT
                        + consistency * CONSISTENCY_WEIGHT;

        pri =
                round(pri);

        /*
         * --------------------------------------------------------
         * 12. BUILD RESPONSE
         * --------------------------------------------------------
         */

        PriResponse response =
                new PriResponse();

        response.setOverallScore(pri);

        response.setTargetScore(80);

        response.setPlacementReady(
                pri >= 80
        );

        response.setLevel(
                getLevel(pri)
        );

        /*
         * --------------------------------------------------------
         * 13. BUILD DIMENSIONS
         * --------------------------------------------------------
         */

        List<PriDimensionResponse> dimensions =
                buildDimensions(
                        aptitude,
                        technical,
                        coding,
                        communication,
                        git,
                        upskilling,
                        consistency
                );

        response.setDimensions(
                dimensions
        );

        /*
         * --------------------------------------------------------
         * 14. TEST COUNTS
         * --------------------------------------------------------
         */

        int aptitudeCount =
                aptitudeTests.size();

        int codingCount =
                codingTests.size();

        response.setAptitudeTests(
                aptitudeCount
        );

        response.setCodingTests(
                codingCount
        );

        response.setTotalTests(
                aptitudeCount + codingCount
        );

        /*
         * --------------------------------------------------------
         * 15. ROADMAP
         * --------------------------------------------------------
         */

        response.setRoadmap(
                buildRoadmap(dimensions)
        );

        /*
         * --------------------------------------------------------
         * 16. RECOMMENDATIONS
         * --------------------------------------------------------
         */

        response.setRecommendations(
                buildRecommendations(dimensions)
        );

        return response;
    }

    /*
     * ============================================================
     * APTITUDE SCORE
     * ============================================================
     *
     * Each completed test:
     *
     * score / totalMarks * 100
     *
     * Final score:
     *
     * Average of all valid completed tests.
     */

    private double calculateAptitudeScore(
            List<TestAssignment> tests
    ) {

        if (tests == null ||
                tests.isEmpty()) {

            return 0;
        }

        double totalPercentage = 0;

        int validTests = 0;

        for (TestAssignment test : tests) {

            if (test.getScore() == null ||
                    test.getTotalMarks() == null ||
                    test.getTotalMarks() <= 0) {

                continue;
            }

            double percentage =
                    ((double) test.getScore()
                            / test.getTotalMarks())
                            * 100.0;

            totalPercentage +=
                    normalize(percentage);

            validTests++;
        }

        if (validTests == 0) {
            return 0;
        }

        return round(
                totalPercentage / validTests
        );
    }

    /*
     * ============================================================
     * CODING SCORE
     * ============================================================
     *
     * Each completed coding test:
     *
     * score / totalMarks * 100
     *
     * Final score:
     *
     * Average of all valid completed tests.
     */

    private double calculateCodingScore(
            List<CodingTestAssignment> tests
    ) {

        if (tests == null ||
                tests.isEmpty()) {

            return 0;
        }

        double totalPercentage = 0;

        int validTests = 0;

        for (CodingTestAssignment test : tests) {

            if (test.getScore() == null ||
                    test.getTotalMarks() == null ||
                    test.getTotalMarks() <= 0) {

                continue;
            }

            double percentage =
                    ((double) test.getScore()
                            / test.getTotalMarks())
                            * 100.0;

            totalPercentage +=
                    normalize(percentage);

            validTests++;
        }

        if (validTests == 0) {
            return 0;
        }

        return round(
                totalPercentage / validTests
        );
    }

    /*
     * ============================================================
     * GITHUB SCORE
     * ============================================================
     */

    private double calculateGithubScore(
            StudentProfile profile
    ) {

        String username =
                profile.getGithubUsername();

        if (username == null ||
                username.isBlank()) {

            return 0;
        }

        try {

            GithubResponse github =
                    githubService.getProfile(
                            username.trim()
                    );

            if (github == null) {
                return 0;
            }

            return normalize(
                    github.getScore()
            );

        } catch (Exception exception) {

            /*
             * GitHub API failure should not stop the entire
             * PRI calculation.
             */

            System.err.println(
                    "Unable to fetch GitHub profile: "
                            + exception.getMessage()
            );

            return 0;
        }
    }

    /*
     * ============================================================
     * CONSISTENCY SCORE
     * ============================================================
     *
     * Based on actual completed assessments.
     *
     * 0 tests  -> 0
     * 1 test   -> 20
     * 2 tests  -> 40
     * 3 tests  -> 60
     * 4 tests  -> 80
     * 5+ tests -> 100
     *
     * Recent activity adds a bonus:
     *
     * Within 7 days  -> +20
     * Within 30 days -> +10
     */

    private double calculateConsistency(
            List<TestAssignment> aptitudeTests,
            List<CodingTestAssignment> codingTests
    ) {

        List<LocalDateTime> submissionDates =
                new ArrayList<>();

        /*
         * Aptitude submissions
         */

        if (aptitudeTests != null) {

            for (TestAssignment test : aptitudeTests) {

                if (test.getSubmittedAt() != null) {

                    submissionDates.add(
                            test.getSubmittedAt()
                    );
                }
            }
        }

        /*
         * Coding submissions
         */

        if (codingTests != null) {

            for (CodingTestAssignment test : codingTests) {

                if (test.getSubmittedAt() != null) {

                    submissionDates.add(
                            test.getSubmittedAt()
                    );
                }
            }
        }

        /*
         * No completed assessments.
         */

        if (submissionDates.isEmpty()) {
            return 0;
        }

        int totalTests =
                submissionDates.size();

        /*
         * Activity score.
         */

        double testActivityScore =
                Math.min(
                        totalTests * 20.0,
                        100.0
                );

        /*
         * Find latest submission.
         */

        LocalDateTime latestSubmission =
                submissionDates.stream()
                        .max(LocalDateTime::compareTo)
                        .orElse(null);

        /*
         * Recency bonus.
         */

        double recencyBonus = 0;

        if (latestSubmission != null) {

            long days =
                    ChronoUnit.DAYS.between(
                            latestSubmission,
                            LocalDateTime.now()
                    );

            if (days <= 7) {

                recencyBonus = 20;

            } else if (days <= 30) {

                recencyBonus = 10;
            }
        }

        return round(
                Math.min(
                        100,
                        testActivityScore + recencyBonus
                )
        );
    }

    /*
     * ============================================================
     * DIMENSIONS
     * ============================================================
     */

    private List<PriDimensionResponse> buildDimensions(
            double aptitude,
            double technical,
            double coding,
            double communication,
            double git,
            double upskilling,
            double consistency
    ) {

        List<PriDimensionResponse> list =
                new ArrayList<>();

        list.add(
                new PriDimensionResponse(
                        "aptitude",
                        "Aptitude",
                        aptitude,
                        APTITUDE_WEIGHT
                )
        );

        list.add(
                new PriDimensionResponse(
                        "technical",
                        "Technical Knowledge",
                        technical,
                        TECHNICAL_WEIGHT
                )
        );

        list.add(
                new PriDimensionResponse(
                        "coding",
                        "Coding",
                        coding,
                        CODING_WEIGHT
                )
        );

        list.add(
                new PriDimensionResponse(
                        "communication",
                        "Communication",
                        communication,
                        COMMUNICATION_WEIGHT
                )
        );

        list.add(
                new PriDimensionResponse(
                        "git",
                        "Git / GitHub",
                        git,
                        GIT_WEIGHT
                )
        );

        list.add(
                new PriDimensionResponse(
                        "upskilling",
                        "Upskilling",
                        upskilling,
                        UPSKILLING_WEIGHT
                )
        );

        list.add(
                new PriDimensionResponse(
                        "consistency",
                        "Consistency",
                        consistency,
                        CONSISTENCY_WEIGHT
                )
        );

        return list;
    }

    /*
     * ============================================================
     * ROADMAP
     * ============================================================
     */

    private List<PriRoadmapStepResponse> buildRoadmap(
            List<PriDimensionResponse> dimensions
    ) {

        List<PriRoadmapStepResponse> steps =
                new ArrayList<>();

        PriDimensionResponse aptitude =
                find(
                        dimensions,
                        "aptitude"
                );

        PriDimensionResponse coding =
                find(
                        dimensions,
                        "coding"
                );

        PriDimensionResponse technical =
                find(
                        dimensions,
                        "technical"
                );

        PriDimensionResponse communication =
                find(
                        dimensions,
                        "communication"
                );

        PriDimensionResponse git =
                find(
                        dimensions,
                        "git"
                );

        PriDimensionResponse consistency =
                find(
                        dimensions,
                        "consistency"
                );

        /*
         * Step 1 - Aptitude
         */

        steps.add(
                new PriRoadmapStepResponse(
                        1,
                        "Aptitude Foundation",
                        getRoadmapDescription(
                                aptitude,
                                "Complete aptitude assessments"
                        ),
                        getStatus(
                                aptitude.getScore(),
                                70
                        ),
                        aptitude.getScore(),
                        70
                )
        );

        /*
         * Step 2 - Coding
         */

        steps.add(
                new PriRoadmapStepResponse(
                        2,
                        "Coding Practice",
                        getRoadmapDescription(
                                coding,
                                "Complete coding assessments"
                        ),
                        getStatus(
                                coding.getScore(),
                                70
                        ),
                        coding.getScore(),
                        70
                )
        );

        /*
         * Step 3 - Technical
         */

        steps.add(
                new PriRoadmapStepResponse(
                        3,
                        "Technical Growth",
                        getRoadmapDescription(
                                technical,
                                "Strengthen technical fundamentals"
                        ),
                        getStatus(
                                technical.getScore(),
                                75
                        ),
                        technical.getScore(),
                        75
                )
        );

        /*
         * Step 4 - Communication
         */

        steps.add(
                new PriRoadmapStepResponse(
                        4,
                        "Professional Skills",
                        getRoadmapDescription(
                                communication,
                                "Improve communication and interview skills"
                        ),
                        getStatus(
                                communication.getScore(),
                                75
                        ),
                        communication.getScore(),
                        75
                )
        );

        /*
         * Step 5 - GitHub
         */

        steps.add(
                new PriRoadmapStepResponse(
                        5,
                        "Developer Profile",
                        getRoadmapDescription(
                                git,
                                "Build a strong GitHub profile"
                        ),
                        getStatus(
                                git.getScore(),
                                70
                        ),
                        git.getScore(),
                        70
                )
        );

        /*
         * Step 6 - Consistency
         */

        steps.add(
                new PriRoadmapStepResponse(
                        6,
                        "Consistency",
                        getRoadmapDescription(
                                consistency,
                                "Practice consistently every week"
                        ),
                        getStatus(
                                consistency.getScore(),
                                75
                        ),
                        consistency.getScore(),
                        75
                )
        );

        return steps;
    }

    private String getRoadmapDescription(
            PriDimensionResponse dimension,
            String defaultText
    ) {

        if (dimension.getScore() >= 75) {

            return "Target achieved";
        }

        if (dimension.getScore() >= 60) {

            return "Almost there — keep improving";
        }

        return defaultText;
    }

    private String getStatus(
            double score,
            double target
    ) {

        if (score >= target) {

            return "COMPLETED";
        }

        if (score >= target - 15) {

            return "CURRENT";
        }

        return "UPCOMING";
    }

    /*
     * ============================================================
     * RECOMMENDATIONS
     * ============================================================
     */

    private List<PriRecommendationResponse>
    buildRecommendations(
            List<PriDimensionResponse> dimensions
    ) {

        List<PriRecommendationResponse> result =
                new ArrayList<>();

        dimensions.stream()
                .sorted(
                        Comparator.comparingDouble(
                                PriDimensionResponse::getScore
                        )
                )
                .limit(3)
                .forEach(dimension -> {

                    String key =
                            dimension.getKey();

                    switch (key) {

                        case "aptitude":

                            result.add(
                                    new PriRecommendationResponse(
                                            "Aptitude",
                                            dimension.getScore(),
                                            "Improve Aptitude",
                                            "Strengthen quantitative, logical and verbal reasoning.",
                                            "Practice Aptitude",
                                            "/student/aptitude-tests"
                                    )
                            );

                            break;

                        case "technical":

                            result.add(
                                    new PriRecommendationResponse(
                                            "Technical Knowledge",
                                            dimension.getScore(),
                                            "Strengthen Technical Knowledge",
                                            "Revise core CS concepts and complete technical assessments.",
                                            "Start Practice",
                                            "/student/aptitude-tests"
                                    )
                            );

                            break;

                        case "coding":

                            result.add(
                                    new PriRecommendationResponse(
                                            "Coding",
                                            dimension.getScore(),
                                            "Improve Coding",
                                            "Solve more programming problems and coding assessments.",
                                            "Practice Coding",
                                            "/student/coding-tests"
                                    )
                            );

                            break;

                        case "communication":

                            result.add(
                                    new PriRecommendationResponse(
                                            "Communication",
                                            dimension.getScore(),
                                            "Improve Communication",
                                            "Practice vocabulary, grammar and interview communication.",
                                            "Improve Skills",
                                            "/student/skills"
                                    )
                            );

                            break;

                        case "git":

                            result.add(
                                    new PriRecommendationResponse(
                                            "Git / GitHub",
                                            dimension.getScore(),
                                            "Build Your GitHub Profile",
                                            "Create projects and maintain consistent repository activity.",
                                            "View Skills",
                                            "/student/skills"
                                    )
                            );

                            break;

                        case "upskilling":

                            result.add(
                                    new PriRecommendationResponse(
                                            "Upskilling",
                                            dimension.getScore(),
                                            "Continue Upskilling",
                                            "Complete courses, certifications and practical projects.",
                                            "View Roadmap",
                                            "/student/roadmap"
                                    )
                            );

                            break;

                        case "consistency":

                            result.add(
                                    new PriRecommendationResponse(
                                            "Consistency",
                                            dimension.getScore(),
                                            "Improve Consistency",
                                            "Practice regularly and maintain weekly learning activity.",
                                            "View Roadmap",
                                            "/student/roadmap"
                                    )
                            );

                            break;

                        default:

                            break;
                    }
                });

        return result;
    }

    /*
     * ============================================================
     * LEVEL
     * ============================================================
     */

    private String getLevel(
            double score
    ) {

        if (score < 40) {

            return "NEEDS_FOUNDATION";
        }

        if (score < 60) {

            return "BEGINNER";
        }

        if (score < 70) {

            return "DEVELOPING";
        }

        if (score < 80) {

            return "PLACEMENT_FOCUSED";
        }

        if (score < 90) {

            return "PLACEMENT_READY";
        }

        return "HIGHLY_READY";
    }

    /*
     * ============================================================
     * FIND DIMENSION
     * ============================================================
     */

    private PriDimensionResponse find(
            List<PriDimensionResponse> dimensions,
            String key
    ) {

        return dimensions.stream()
                .filter(
                        dimension ->
                                dimension.getKey()
                                        .equals(key)
                )
                .findFirst()
                .orElseThrow();
    }

    /*
     * ============================================================
     * NORMALIZE
     * ============================================================
     */

    private double normalize(
            double score
    ) {

        if (score < 0) {

            return 0;
        }

        if (score > 100) {

            return 100;
        }

        return score;
    }

    /*
     * ============================================================
     * ROUND
     * ============================================================
     */

    private double round(
            double value
    ) {

        return Math.round(
                value * 10.0
        ) / 10.0;
    }

    /*
     * ============================================================
     * CALCULATE PRI USING USER ID
     * ============================================================
     *
     * This is useful when your controller receives the logged-in
     * application's User ID instead of StudentProfile ID.
     */

    public PriResponse calculatePRIByUserId(
            Long userId
    ) {

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student profile not found for user ID: "
                                                + userId
                                )
                        );

        return calculatePRI(
                profile.getId()
        );
    }
}