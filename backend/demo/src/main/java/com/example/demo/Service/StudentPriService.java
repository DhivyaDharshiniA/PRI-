package com.example.demo.Service;

import com.example.demo.dto.pri.PriDimensionResponse;
import com.example.demo.dto.pri.PriRecommendationResponse;
import com.example.demo.dto.pri.PriResponse;
import com.example.demo.dto.pri.PriScoreResponse;
import com.example.demo.dto.pri.PriRoadmapStepResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class StudentPriService {

    /*
     * PRI WEIGHTS
     *
     * Total = 100%
     */
    private static final double APTITUDE_WEIGHT = 0.15;
    private static final double TECHNICAL_WEIGHT = 0.20;
    private static final double CODING_WEIGHT = 0.20;
    private static final double COMMUNICATION_WEIGHT = 0.15;
    private static final double GIT_WEIGHT = 0.10;
    private static final double UPSKILLING_WEIGHT = 0.10;
    private static final double CONSISTENCY_WEIGHT = 0.10;

    public PriResponse calculatePRI(Long studentId) {

        /*
         * ------------------------------------------------------------
         * IMPORTANT
         * ------------------------------------------------------------
         *
         * These values are placeholders for dimensions that are not
         * yet connected to your database.
         *
         * Aptitude and Coding can be replaced with your actual
         * repositories/services.
         */

        double aptitude = getAptitudeScore(studentId);

        double technical = getTechnicalScore(studentId);

        double coding = getCodingScore(studentId);

        double communication = getCommunicationScore(studentId);

        double git = getGitScore(studentId);

        double upskilling = getUpskillingScore(studentId);

        double consistency = getConsistencyScore(studentId);

        /*
         * ------------------------------------------------------------
         * CALCULATE PRI
         * ------------------------------------------------------------
         */

        double pri =
                aptitude * APTITUDE_WEIGHT
                        + technical * TECHNICAL_WEIGHT
                        + coding * CODING_WEIGHT
                        + communication * COMMUNICATION_WEIGHT
                        + git * GIT_WEIGHT
                        + upskilling * UPSKILLING_WEIGHT
                        + consistency * CONSISTENCY_WEIGHT;

        pri = Math.round(pri * 10.0) / 10.0;

        PriResponse response = new PriResponse();

        response.setOverallScore(pri);
        response.setTargetScore(80);
        response.setPlacementReady(pri >= 80);
        response.setLevel(getLevel(pri));

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

        response.setDimensions(dimensions);

        response.setTotalTests(
                getTotalTests(studentId)
        );

        response.setAptitudeTests(
                getAptitudeTestCount(studentId)
        );

        response.setCodingTests(
                getCodingTestCount(studentId)
        );

        response.setRoadmap(
                buildRoadmap(dimensions)
        );

        response.setRecommendations(
                buildRecommendations(dimensions)
        );

        return response;
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

        list.add(new PriDimensionResponse(
                "aptitude",
                "Aptitude",
                aptitude,
                APTITUDE_WEIGHT
        ));

        list.add(new PriDimensionResponse(
                "technical",
                "Technical Knowledge",
                technical,
                TECHNICAL_WEIGHT
        ));

        list.add(new PriDimensionResponse(
                "coding",
                "Coding",
                coding,
                CODING_WEIGHT
        ));

        list.add(new PriDimensionResponse(
                "communication",
                "Communication",
                communication,
                COMMUNICATION_WEIGHT
        ));

        list.add(new PriDimensionResponse(
                "git",
                "Git / GitHub",
                git,
                GIT_WEIGHT
        ));

        list.add(new PriDimensionResponse(
                "upskilling",
                "Upskilling",
                upskilling,
                UPSKILLING_WEIGHT
        ));

        list.add(new PriDimensionResponse(
                "consistency",
                "Consistency",
                consistency,
                CONSISTENCY_WEIGHT
        ));

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
                find(dimensions, "aptitude");

        PriDimensionResponse coding =
                find(dimensions, "coding");

        PriDimensionResponse technical =
                find(dimensions, "technical");

        PriDimensionResponse communication =
                find(dimensions, "communication");

        PriDimensionResponse git =
                find(dimensions, "git");

        PriDimensionResponse consistency =
                find(dimensions, "consistency");

        steps.add(new PriRoadmapStepResponse(
                1,
                "Aptitude Foundation",
                getRoadmapDescription(
                        aptitude,
                        "Complete aptitude assessments"
                ),
                getStatus(aptitude.getScore(), 70),
                aptitude.getScore(),
                70
        ));

        steps.add(new PriRoadmapStepResponse(
                2,
                "Coding Practice",
                getRoadmapDescription(
                        coding,
                        "Complete coding assessments"
                ),
                getStatus(coding.getScore(), 70),
                coding.getScore(),
                70
        ));

        steps.add(new PriRoadmapStepResponse(
                3,
                "Technical Growth",
                getRoadmapDescription(
                        technical,
                        "Strengthen technical fundamentals"
                ),
                getStatus(technical.getScore(), 75),
                technical.getScore(),
                75
        ));

        steps.add(new PriRoadmapStepResponse(
                4,
                "Professional Skills",
                getRoadmapDescription(
                        communication,
                        "Improve communication and interview skills"
                ),
                getStatus(communication.getScore(), 75),
                communication.getScore(),
                75
        ));

        steps.add(new PriRoadmapStepResponse(
                5,
                "Developer Profile",
                getRoadmapDescription(
                        git,
                        "Build a strong GitHub profile"
                ),
                getStatus(git.getScore(), 70),
                git.getScore(),
                70
        ));

        steps.add(new PriRoadmapStepResponse(
                6,
                "Consistency",
                getRoadmapDescription(
                        consistency,
                        "Practice consistently every week"
                ),
                getStatus(consistency.getScore(), 75),
                consistency.getScore(),
                75
        ));

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
                    }
                });

        return result;
    }

    /*
     * ============================================================
     * LEVEL
     * ============================================================
     */

    private String getLevel(double score) {

        if (score < 40)
            return "NEEDS_FOUNDATION";

        if (score < 60)
            return "BEGINNER";

        if (score < 70)
            return "DEVELOPING";

        if (score < 80)
            return "PLACEMENT_FOCUSED";

        if (score < 90)
            return "PLACEMENT_READY";

        return "HIGHLY_READY";
    }

    private PriDimensionResponse find(
            List<PriDimensionResponse> dimensions,
            String key
    ) {

        return dimensions.stream()
                .filter(d -> d.getKey().equals(key))
                .findFirst()
                .orElseThrow();
    }

    /*
     * ============================================================
     * TEMPORARY DATA PROVIDERS
     *
     * Replace these with repository/service calls.
     * ============================================================
     */

    private double getAptitudeScore(Long studentId) {
        return 78;
    }

    private double getTechnicalScore(Long studentId) {
        return 65;
    }

    private double getCodingScore(Long studentId) {
        return 82;
    }

    private double getCommunicationScore(Long studentId) {
        return 70;
    }

    private double getGitScore(Long studentId) {
        return 60;
    }

    private double getUpskillingScore(Long studentId) {
        return 75;
    }

    private double getConsistencyScore(Long studentId) {
        return 68;
    }

    private int getTotalTests(Long studentId) {
        return 8;
    }

    private int getAptitudeTestCount(Long studentId) {
        return 5;
    }

    private int getCodingTestCount(Long studentId) {
        return 3;
    }
}
