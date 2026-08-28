package com.example.demo.dto.external;

public class ExternalProfileResponse {

    private String githubUsername;
    private String leetcodeUsername;

    private GithubResponse github;
    private LeetcodeResponse leetcode;

    private double overallScore;

    public ExternalProfileResponse() {
    }

    public ExternalProfileResponse(
            String githubUsername,
            String leetcodeUsername,
            GithubResponse github,
            LeetcodeResponse leetcode,
            double overallScore
    ) {
        this.githubUsername = githubUsername;
        this.leetcodeUsername = leetcodeUsername;
        this.github = github;
        this.leetcode = leetcode;
        this.overallScore = overallScore;
    }

    /*
     * Backward-compatible constructor
     */
    public ExternalProfileResponse(
            String githubUsername,
            String leetcodeUsername,
            GithubResponse github,
            LeetcodeResponse leetcode
    ) {
        this.githubUsername = githubUsername;
        this.leetcodeUsername = leetcodeUsername;
        this.github = github;
        this.leetcode = leetcode;

        this.overallScore = calculateOverallScore(
                github,
                leetcode
        );
    }

    private double calculateOverallScore(
            GithubResponse github,
            LeetcodeResponse leetcode
    ) {

        double githubScore =
                github != null ? github.getScore() : 0;

        double leetcodeScore =
                leetcode != null ? leetcode.getScore() : 0;

        if (github == null && leetcode == null) {
            return 0;
        }

        if (github == null) {
            return leetcodeScore;
        }

        if (leetcode == null) {
            return githubScore;
        }

        return Math.round(
                ((githubScore + leetcodeScore) / 2.0) * 10
        ) / 10.0;
    }

    public String getGithubUsername() {
        return githubUsername;
    }

    public void setGithubUsername(String githubUsername) {
        this.githubUsername = githubUsername;
    }

    public String getLeetcodeUsername() {
        return leetcodeUsername;
    }

    public void setLeetcodeUsername(String leetcodeUsername) {
        this.leetcodeUsername = leetcodeUsername;
    }

    public GithubResponse getGithub() {
        return github;
    }

    public void setGithub(GithubResponse github) {
        this.github = github;
    }

    public LeetcodeResponse getLeetcode() {
        return leetcode;
    }

    public void setLeetcode(LeetcodeResponse leetcode) {
        this.leetcode = leetcode;
    }

    public double getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(double overallScore) {
        this.overallScore = overallScore;
    }
}