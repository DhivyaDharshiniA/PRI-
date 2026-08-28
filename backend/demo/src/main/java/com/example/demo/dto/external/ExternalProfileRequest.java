package com.example.demo.dto.external;

public class ExternalProfileRequest {

    private String githubUsername;
    private String leetcodeUsername;

    public ExternalProfileRequest() {
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
}