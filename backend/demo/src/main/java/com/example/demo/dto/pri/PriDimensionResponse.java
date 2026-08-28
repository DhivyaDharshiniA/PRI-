package com.example.demo.dto.pri;

public class PriDimensionResponse {

    private String key;
    private String name;
    private double score;
    private double weight;

    public PriDimensionResponse() {
    }

    public PriDimensionResponse(
            String key,
            String name,
            double score,
            double weight
    ) {
        this.key = key;
        this.name = name;
        this.score = score;
        this.weight = weight;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getWeightedScore() {
        return score * weight;
    }
}