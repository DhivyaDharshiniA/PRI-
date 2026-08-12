package com.example.demo.service;

import com.example.demo.dto.github.GithubEventDTO;
import com.example.demo.dto.github.GithubRepositoryDTO;
import com.example.demo.dto.github.GithubUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GithubService {

    private final RestClient githubClient;

    public GithubUserDTO getUser(String username) {

        return githubClient.get()
                .uri("/users/{username}", username)
                .retrieve()
                .body(GithubUserDTO.class);
    }

    public List<GithubRepositoryDTO> getRepositories(
            String username
    ) {

        GithubRepositoryDTO[] response =
                githubClient.get()
                        .uri(uriBuilder ->
                                uriBuilder
                                        .path("/users/{username}/repos")
                                        .queryParam("per_page", 100)
                                        .queryParam("sort", "pushed")
                                        .build(username)
                        )
                        .retrieve()
                        .body(GithubRepositoryDTO[].class);

        if (response == null) {
            return Collections.emptyList();
        }

        return Arrays.asList(response);
    }

    public List<GithubEventDTO> getPublicEvents(
            String username
    ) {

        GithubEventDTO[] response =
                githubClient.get()
                        .uri(uriBuilder ->
                                uriBuilder
                                        .path("/users/{username}/events/public")
                                        .queryParam("per_page", 100)
                                        .build(username)
                        )
                        .retrieve()
                        .body(GithubEventDTO[].class);

        if (response == null) {
            return Collections.emptyList();
        }

        return Arrays.asList(response);
    }
}