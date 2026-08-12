package com.example.demo.dto.github;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class GithubRepositoryDTO {

    private String name;

    private boolean fork;

    @JsonProperty("stargazers_count")
    private int stargazersCount;

    @JsonProperty("pushed_at")
    private OffsetDateTime pushedAt;

    @JsonProperty("created_at")
    private OffsetDateTime createdAt;
}