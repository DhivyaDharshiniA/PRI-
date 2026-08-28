package com.example.demo.dto.pri;

import java.util.List;

public class PriResponse {

    private double overallScore;
    private String level;
    private double targetScore;
    private boolean placementReady;

    private int totalTests;
    private int aptitudeTests;
    private int codingTests;

    private double githubScore;
    private double leetcodeScore;
    private double externalScore;

    private List<PriDimensionResponse> dimensions;
    private List<PriRoadmapStepResponse> roadmap;
    private List<PriRecommendationResponse> recommendations;

    public PriResponse() {
    }

    public double getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(double overallScore) {
        this.overallScore = overallScore;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public double getTargetScore() {
        return targetScore;
    }

    public void setTargetScore(double targetScore) {
        this.targetScore = targetScore;
    }

    public boolean isPlacementReady() {
        return placementReady;
    }

    public void setPlacementReady(boolean placementReady) {
        this.placementReady = placementReady;
    }

    public int getTotalTests() {
        return totalTests;
    }

    public void setTotalTests(int totalTests) {
        this.totalTests = totalTests;
    }

    public int getAptitudeTests() {
        return aptitudeTests;
    }

    public void setAptitudeTests(int aptitudeTests) {
        this.aptitudeTests = aptitudeTests;
    }

    public int getCodingTests() {
        return codingTests;
    }

    public void setCodingTests(int codingTests) {
        this.codingTests = codingTests;
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

    public double getExternalScore() {
        return externalScore;
    }

    public void setExternalScore(double externalScore) {
        this.externalScore = externalScore;
    }

    public List<PriDimensionResponse> getDimensions() {
        return dimensions;
    }

    public void setDimensions(List<PriDimensionResponse> dimensions) {
        this.dimensions = dimensions;
    }

    public List<PriRoadmapStepResponse> getRoadmap() {
        return roadmap;
    }

    public void setRoadmap(List<PriRoadmapStepResponse> roadmap) {
        this.roadmap = roadmap;
    }

    public List<PriRecommendationResponse> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(
            List<PriRecommendationResponse> recommendations
    ) {
        this.recommendations = recommendations;
    }
}