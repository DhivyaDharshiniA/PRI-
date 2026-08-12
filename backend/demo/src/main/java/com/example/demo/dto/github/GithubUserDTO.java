package com.example.demo.dto.github;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GithubUserDTO {

    private String login;

    private String name;

    private String bio;

    @JsonProperty("public_repos")
    private int publicRepos;

    private int followers;

    private int following;

    @JsonProperty("html_url")
    private String htmlUrl;
}