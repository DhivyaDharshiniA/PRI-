package com.example.demo.controller;

import com.example.demo.dto.github.GithubRepositoryDTO;
import com.example.demo.dto.github.GithubScoreResponse;
import com.example.demo.dto.github.GithubUserDTO;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.Service.GithubScoreService;
import com.example.demo.service.GithubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/github")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class StudentGithubController {

    private final UserRepository userRepository;

    private final GithubService githubService;

    private final GithubScoreService githubScoreService;


    /*
     * -----------------------------------------
     * GET GITHUB PROFILE + SCORE
     * -----------------------------------------
     */

    @GetMapping
    public ResponseEntity<GithubScoreResponse> getGithub(
            Authentication authentication
    ) {

        User user =
                userRepository
                        .findByEmail(authentication.getName())
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Student not found"
                                )
                        );

        String username =
                user.getGithubUsername();

        if (username == null ||
                username.isBlank()) {

            return ResponseEntity.badRequest()
                    .body(
                            GithubScoreResponse.builder()
                                    .username(null)
                                    .githubScore(0)
                                    .activityLevel(
                                            "GITHUB_NOT_CONNECTED"
                                    )
                                    .build()
                    );
        }

        GithubUserDTO githubUser =
                githubService.getUser(username);

        double score =
                githubScoreService.calculateScore(
                        username
                );

        String activityLevel =
                getActivityLevel(score);

        return ResponseEntity.ok(
                GithubScoreResponse.builder()
                        .username(
                                githubUser.getLogin()
                        )
                        .profileUrl(
                                githubUser.getHtmlUrl()
                        )
                        .publicRepositories(
                                githubUser.getPublicRepos()
                        )
                        .followers(
                                githubUser.getFollowers()
                        )
                        .following(
                                githubUser.getFollowing()
                        )
                        .githubScore(score)
                        .activityLevel(
                                activityLevel
                        )
                        .build()
        );
    }


    /*
     * -----------------------------------------
     * GET REPOSITORIES
     * -----------------------------------------
     */

    @GetMapping("/repositories")
    public ResponseEntity<List<GithubRepositoryDTO>>
    getRepositories(
            Authentication authentication
    ) {

        User user =
                userRepository
                        .findByEmail(authentication.getName())
                        .orElseThrow();

        String username =
                user.getGithubUsername();

        if (username == null ||
                username.isBlank()) {

            return ResponseEntity.badRequest()
                    .build();
        }

        return ResponseEntity.ok(
                githubService.getRepositories(
                        username
                )
        );
    }


    private String getActivityLevel(
            double score
    ) {

        if (score >= 80) {
            return "EXCELLENT";
        }

        if (score >= 60) {
            return "GOOD";
        }

        if (score >= 40) {
            return "MODERATE";
        }

        return "LOW";
    }
}