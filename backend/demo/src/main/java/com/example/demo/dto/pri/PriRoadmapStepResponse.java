package com.example.demo.dto.pri;

public class PriRoadmapStepResponse {

    private int step;
    private String title;
    private String description;
    private String status;
    private double currentScore;
    private double targetScore;

    public PriRoadmapStepResponse() {
    }

    public PriRoadmapStepResponse(
            int step,
            String title,
            String description,
            String status,
            double currentScore,
            double targetScore
    ) {
        this.step = step;
        this.title = title;
        this.description = description;
        this.status = status;
        this.currentScore = currentScore;
        this.targetScore = targetScore;
    }

    public int getStep() {
        return step;
    }

    public void setStep(int step) {
        this.step = step;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getCurrentScore() {
        return currentScore;
    }

    public void setCurrentScore(double currentScore) {
        this.currentScore = currentScore;
    }

    public double getTargetScore() {
        return targetScore;
    }

    public void setTargetScore(double targetScore) {
        this.targetScore = targetScore;
    }
}