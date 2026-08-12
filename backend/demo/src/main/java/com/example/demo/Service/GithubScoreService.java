package com.example.demo.Service;

import com.example.demo.dto.github.GithubEventDTO;
import com.example.demo.dto.github.GithubRepositoryDTO;
import com.example.demo.dto.github.GithubUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GithubScoreService {

    private final com.example.demo.service.GithubService githubService;

    public double calculateScore(String username) {

        if (username == null || username.isBlank()) {
            return 0;
        }

        try {

            GithubUserDTO user =
                    githubService.getUser(username);

            List<GithubRepositoryDTO> repositories =
                    githubService.getRepositories(username);

            List<GithubEventDTO> events =
                    githubService.getPublicEvents(username);

            /*
             * 1. Repository score
             *
             * Maximum = 30
             */
            double repositoryScore =
                    Math.min(user.getPublicRepos(), 15) / 15.0 * 30.0;

            /*
             * 2. Recent repository activity
             *
             * Maximum = 25
             */
            OffsetDateTime now = OffsetDateTime.now();

            long recentRepositories =
                    repositories.stream()
                            .filter(repo -> repo.getPushedAt() != null)
                            .filter(repo ->
                                    ChronoUnit.DAYS.between(
                                            repo.getPushedAt(),
                                            now
                                    ) <= 90
                            )
                            .count();

            double recentRepositoryScore =
                    Math.min(recentRepositories, 10)
                            / 10.0 * 25.0;

            /*
             * 3. GitHub public coding activity
             *
             * Maximum = 30
             */
            long pushEvents =
                    events.stream()
                            .filter(event ->
                                    "PushEvent".equals(event.getType()))
                            .count();

            double activityScore =
                    Math.min(pushEvents, 20)
                            / 20.0 * 30.0;

            /*
             * 4. Profile completeness
             *
             * Maximum = 15
             */
            double profileScore = 0;

            if (user.getName() != null &&
                    !user.getName().isBlank()) {

                profileScore += 5;
            }

            if (user.getBio() != null &&
                    !user.getBio().isBlank()) {

                profileScore += 5;
            }

            if (user.getFollowers() > 0) {
                profileScore += 5;
            }

            double total =
                    repositoryScore
                            + recentRepositoryScore
                            + activityScore
                            + profileScore;

            return round(
                    Math.min(100, Math.max(0, total))
            );

        } catch (Exception e) {

            /*
             * External API failure should not
             * break the complete PRI calculation.
             */
            return 0;
        }
    }

    private double round(double value) {

        return Math.round(value * 100.0) / 100.0;
    }
}