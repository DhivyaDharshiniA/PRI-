package com.example.demo.Service;

import com.example.demo.dto.external.GithubResponse;
import com.example.demo.dto.external.LeetcodeResponse;
import com.example.demo.dto.pri.PriScoreResponse;
import org.springframework.stereotype.Service;

@Service
public class PriScoreService {

    private final GithubService githubService;
    private final LeetcodeService leetcodeService;

    public PriScoreService(
            GithubService githubService,
            LeetcodeService leetcodeService
    ) {
        this.githubService = githubService;
        this.leetcodeService = leetcodeService;
    }

    public PriScoreResponse calculate(
            double aptitudeScore,
            double codingScore,
            String githubUsername,
            String leetcodeUsername
    ) {

        // -----------------------------
        // GITHUB
        // -----------------------------

        GithubResponse github =
                githubUsername != null
                        && !githubUsername.isBlank()
                        ? githubService.getProfile(githubUsername)
                        : null;


        // -----------------------------
        // LEETCODE
        // -----------------------------

        LeetcodeResponse leetcode =
                leetcodeUsername != null
                        && !leetcodeUsername.isBlank()
                        ? leetcodeService.getLeetcodeDetails(
                        leetcodeUsername
                )
                        : null;


        double githubScore =
                github != null
                        ? github.getScore()
                        : 0;


        double leetcodeScore =
                leetcode != null
                        ? leetcode.getScore()
                        : 0;


        // -----------------------------
        // NORMALIZE
        // -----------------------------

        aptitudeScore = normalize(aptitudeScore);
        codingScore = normalize(codingScore);
        githubScore = normalize(githubScore);
        leetcodeScore = normalize(leetcodeScore);


        // -----------------------------
        // PRI CALCULATION
        // -----------------------------

        /*
         * Current four-component PRI:
         *
         * Aptitude  = 30%
         * Coding    = 40%
         * GitHub    = 15%
         * LeetCode  = 15%
         *
         * Total = 100%
         */

        double priScore =
                (aptitudeScore * 0.30)
                        +
                        (codingScore * 0.40)
                        +
                        (githubScore * 0.15)
                        +
                        (leetcodeScore * 0.15);


        priScore =
                Math.round(priScore * 100.0) / 100.0;


        String level =
                getLevel(priScore);


        return new PriScoreResponse(
                aptitudeScore,
                codingScore,
                githubScore,
                leetcodeScore,
                priScore,
                level
        );
    }


    private double normalize(double score) {

        if (score < 0) {
            return 0;
        }

        if (score > 100) {
            return 100;
        }

        return score;
    }


    private String getLevel(double score) {

        if (score >= 85) {
            return "Excellent";
        }

        if (score >= 75) {
            return "Placement Ready";
        }

        if (score >= 60) {
            return "Good";
        }

        if (score >= 40) {
            return "Needs Improvement";
        }

        return "Needs Attention";
    }
}