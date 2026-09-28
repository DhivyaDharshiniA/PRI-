package com.example.demo.controller;

public class PlacementStudentPriResponse {

    private Long studentId;

    private Double priScore;

    private String level;

    private Boolean placementReady;

    private Integer totalTests;

    private Integer aptitudeTests;

    private Integer codingTests;

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Double getPriScore() {
        return priScore;
    }

    public void setPriScore(Double priScore) {
        this.priScore = priScore;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Boolean getPlacementReady() {
        return placementReady;
    }

    public void setPlacementReady(Boolean placementReady) {
        this.placementReady = placementReady;
    }

    public Integer getTotalTests() {
        return totalTests;
    }

    public void setTotalTests(Integer totalTests) {
        this.totalTests = totalTests;
    }

    public Integer getAptitudeTests() {
        return aptitudeTests;
    }

    public void setAptitudeTests(Integer aptitudeTests) {
        this.aptitudeTests = aptitudeTests;
    }

    public Integer getCodingTests() {
        return codingTests;
    }

    public void setCodingTests(Integer codingTests) {
        this.codingTests = codingTests;
    }
}