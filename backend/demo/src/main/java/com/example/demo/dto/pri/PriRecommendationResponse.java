package com.example.demo.dto.pri;

public class PriRecommendationResponse {

    private String skill;
    private double score;
    private String title;
    private String description;
    private String action;
    private String route;

    public PriRecommendationResponse() {
    }

    public PriRecommendationResponse(
            String skill,
            double score,
            String title,
            String description,
            String action,
            String route
    ) {
        this.skill = skill;
        this.score = score;
        this.title = title;
        this.description = description;
        this.action = action;
        this.route = route;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
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

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }
}