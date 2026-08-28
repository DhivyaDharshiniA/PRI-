package com.example.demo.dto.external;

public class LeetcodeResponse {

    private String username;

    private int totalSolved;
    private int easySolved;
    private int mediumSolved;
    private int hardSolved;

    private int score;

    public LeetcodeResponse() {
    }

    /*
     * Current constructor
     */
    public LeetcodeResponse(
            String username,
            int totalSolved,
            int easySolved,
            int mediumSolved,
            int hardSolved,
            int score
    ) {
        this.username = username;
        this.totalSolved = totalSolved;
        this.easySolved = easySolved;
        this.mediumSolved = mediumSolved;
        this.hardSolved = hardSolved;
        this.score = score;
    }

    /*
     * Backward-compatible constructor.
     *
     * Existing LeetcodeService is still using:
     *
     * boolean,
     * String,
     * int,
     * int,
     * int,
     * int,
     * int,
     * String
     *
     * The boolean and final String are not currently
     * represented in this DTO.
     */
    public LeetcodeResponse(
            boolean success,
            String username,
            int totalSolved,
            int easySolved,
            int mediumSolved,
            int hardSolved,
            int score,
            String message
    ) {
        this.username = username;
        this.totalSolved = totalSolved;
        this.easySolved = easySolved;
        this.mediumSolved = mediumSolved;
        this.hardSolved = hardSolved;
        this.score = score;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getTotalSolved() {
        return totalSolved;
    }

    public void setTotalSolved(int totalSolved) {
        this.totalSolved = totalSolved;
    }

    public int getEasySolved() {
        return easySolved;
    }

    public void setEasySolved(int easySolved) {
        this.easySolved = easySolved;
    }

    public int getMediumSolved() {
        return mediumSolved;
    }

    public void setMediumSolved(int mediumSolved) {
        this.mediumSolved = mediumSolved;
    }

    public int getHardSolved() {
        return hardSolved;
    }

    public void setHardSolved(int hardSolved) {
        this.hardSolved = hardSolved;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}