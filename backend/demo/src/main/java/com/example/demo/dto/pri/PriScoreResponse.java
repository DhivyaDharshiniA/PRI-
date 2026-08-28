package com.example.demo.dto.pri;

public class PriScoreResponse {

    private double aptitudeScore;
    private double codingScore;
    private double githubScore;
    private double leetcodeScore;

    private double priScore;
    private String level;

    public PriScoreResponse() {
    }

    public PriScoreResponse(
            double aptitudeScore,
            double codingScore,
            double githubScore,
            double leetcodeScore,
            double priScore,
            String level
    ) {
        this.aptitudeScore = aptitudeScore;
        this.codingScore = codingScore;
        this.githubScore = githubScore;
        this.leetcodeScore = leetcodeScore;
        this.priScore = priScore;
        this.level = level;
    }

    public double getAptitudeScore() {
        return aptitudeScore;
    }

    public void setAptitudeScore(double aptitudeScore) {
        this.aptitudeScore = aptitudeScore;
    }

    public double getCodingScore() {
        return codingScore;
    }

    public void setCodingScore(double codingScore) {
        this.codingScore = codingScore;
    }

    public double getGithubScore() {
        return githubScore;
    }

    public void setGithubScore(double githubScore) {
        this.githubScore = githubScore;
    }

    public double getLeetcodeScore() {
        return leetcodeScore;
    }

    public void setLeetcodeScore(double leetcodeScore) {
        this.leetcodeScore = leetcodeScore;
    }

    public double getPriScore() {
        return priScore;
    }

    public void setPriScore(double priScore) {
        this.priScore = priScore;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}