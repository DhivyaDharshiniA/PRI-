package com.example.demo.dto.github;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GithubScoreResponse {

    private String username;

    private String profileUrl;

    private int publicRepositories;

    private int followers;

    private int following;

    private double githubScore;

    private String activityLevel;
}