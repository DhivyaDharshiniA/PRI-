package com.example.demo.dto.github;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class GithubEventDTO {

    private String type;

    @JsonProperty("created_at")
    private OffsetDateTime createdAt;
}