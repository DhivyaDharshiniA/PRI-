package com.example.demo.Service;

import com.example.demo.dto.external.GithubResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class GithubService {

    private final RestTemplate restTemplate;

    public GithubService() {
        this.restTemplate = new RestTemplate();
    }

    public GithubResponse getProfile(String username) {

        if (username == null || username.isBlank()) {
            return null;
        }

        String url = "https://api.github.com/users/" + username.trim();

        try {

            @SuppressWarnings("unchecked")
            Map<String, Object> data =
                    restTemplate.getForObject(url, Map.class);

            if (data == null) {
                return null;
            }

            String login = getString(data, "login");
            String name = getString(data, "name");

            int publicRepos = getInt(data, "public_repos");
            int followers = getInt(data, "followers");
            int following = getInt(data, "following");

            double score = calculateScore(
                    publicRepos,
                    followers,
                    following
            );

            return new GithubResponse(
                    login,
                    name,
                    publicRepos,
                    followers,
                    following,
                    score
            );

        } catch (Exception e) {

            System.err.println(
                    "GitHub profile fetch failed for "
                            + username
                            + ": "
                            + e.getMessage()
            );

            return null;
        }
    }

    private String getString(Map<String, Object> data, String key) {

        Object value = data.get(key);

        return value != null
                ? value.toString()
                : "";
    }

    private int getInt(Map<String, Object> data, String key) {

        Object value = data.get(key);

        if (value instanceof Number) {
            return ((Number) value).intValue();
        }

        return 0;
    }

    /**
     * GitHub score used for PRI.
     *
     * Maximum = 100
     *
     * Repositories : 40 marks
     * Followers     : 30 marks
     * Following     : 10 marks
     * Activity      : 20 marks
     */
    private double calculateScore(
            int publicRepos,
            int followers,
            int following
    ) {

        double repoScore =
                Math.min(publicRepos / 20.0, 1.0) * 40.0;

        double followerScore =
                Math.min(followers / 50.0, 1.0) * 30.0;

        double followingScore =
                Math.min(following / 20.0, 1.0) * 10.0;

        double activityScore =
                Math.min(
                        (publicRepos + followers) / 100.0,
                        1.0
                ) * 20.0;

        return Math.round(
                (repoScore
                        + followerScore
                        + followingScore
                        + activityScore)
                        * 100.0
        ) / 100.0;
    }
}