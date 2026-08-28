//package com.example.demo.Service;
//
//import com.example.demo.dto.external.LeetcodeResponse;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class LeetcodeService {
//
//    private final RestTemplate restTemplate;
//
//    public LeetcodeService() {
//        this.restTemplate = new RestTemplate();
//    }
//
//    public LeetcodeResponse getLeetcodeDetails(
//            String username
//    ) {
//
//        if (username == null || username.isBlank()) {
//
//            return empty(username);
//        }
//
//        String query = """
//                query getUserProfile($username: String!) {
//                    matchedUser(username: $username) {
//                        username
//
//                        profile {
//                            realName
//                        }
//
//                        submitStatsGlobal {
//                            acSubmissionNum {
//                                difficulty
//                                count
//                            }
//                        }
//                    }
//                }
//                """;
//
//        Map<String, Object> variables =
//                new HashMap<>();
//
//        variables.put(
//                "username",
//                username
//        );
//
//        Map<String, Object> body =
//                new HashMap<>();
//
//        body.put("query", query);
//        body.put("variables", variables);
//
//        HttpHeaders headers =
//                new HttpHeaders();
//
//        headers.setContentType(
//                MediaType.APPLICATION_JSON
//        );
//
//        HttpEntity<Map<String, Object>> request =
//                new HttpEntity<>(
//                        body,
//                        headers
//                );
//
//        try {
//
//            ResponseEntity<Map> response =
//                    restTemplate.postForEntity(
//                            "https://leetcode.com/graphql/",
//                            request,
//                            Map.class
//                    );
//
//            return parseResponse(
//                    username,
//                    response.getBody()
//            );
//
//        } catch (Exception e) {
//
//            System.err.println(
//                    "LeetCode API error: "
//                            + e.getMessage()
//            );
//
//            return empty(username);
//        }
//    }
//
//    private LeetcodeResponse parseResponse(
//            String username,
//            Map<String, Object> response
//    ) {
//
//        if (response == null) {
//            return empty(username);
//        }
//
//        Map data =
//                (Map) response.get("data");
//
//        if (data == null) {
//            return empty(username);
//        }
//
//        Map matchedUser =
//                (Map) data.get("matchedUser");
//
//        if (matchedUser == null) {
//            return empty(username);
//        }
//
//        String actualUsername =
//                String.valueOf(
//                        matchedUser.getOrDefault(
//                                "username",
//                                username
//                        )
//                );
//
//        Map submitStats =
//                (Map) matchedUser.get(
//                        "submitStatsGlobal"
//                );
//
//        int easy = 0;
//        int medium = 0;
//        int hard = 0;
//
//        if (submitStats != null) {
//
//            List<Map<String, Object>> submissions =
//                    (List<Map<String, Object>>)
//                            submitStats.get(
//                                    "acSubmissionNum"
//                            );
//
//            if (submissions != null) {
//
//                for (
//                        Map<String, Object> item :
//                        submissions
//                ) {
//
//                    String difficulty =
//                            String.valueOf(
//                                    item.get("difficulty")
//                            );
//
//                    int count =
//                            item.get("count")
//                                    instanceof Number
//                                    ? ((Number) item
//                                    .get("count"))
//                                    .intValue()
//                                    : 0;
//
//                    switch (difficulty) {
//
//                        case "Easy":
//                            easy = count;
//                            break;
//
//                        case "Medium":
//                            medium = count;
//                            break;
//
//                        case "Hard":
//                            hard = count;
//                            break;
//                    }
//                }
//            }
//        }
//
//        int total =
//                easy + medium + hard;
//
//        int score =
//                calculateScore(
//                        easy,
//                        medium,
//                        hard
//                );
//
//        return new LeetcodeResponse(
//                true,
//                actualUsername,
//                total,
//                easy,
//                medium,
//                hard,
//                score,
//                "https://leetcode.com/u/"
//                        + actualUsername
//                        + "/"
//        );
//    }
//
//    private int calculateScore(
//            int easy,
//            int medium,
//            int hard
//    ) {
//
//        /*
//         * Simple initial score.
//         *
//         * Medium and hard problems contribute
//         * more than easy problems.
//         */
//
//        double score =
//                Math.min(easy * 0.10, 20)
//                        +
//                        Math.min(medium * 0.40, 40)
//                        +
//                        Math.min(hard * 1.00, 40);
//
//        return (int) Math.min(
//                100,
//                Math.round(score)
//        );
//    }
//
//    private LeetcodeResponse empty(
//            String username
//    ) {
//
//        return new LeetcodeResponse(
//                false,
//                username,
//                0,
//                0,
//                0,
//                0,
//                0,
//                null
//        );
//    }
//}

package com.example.demo.Service;

import com.example.demo.dto.external.LeetcodeResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LeetcodeService {

    private final RestTemplate restTemplate;

    public LeetcodeService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Main method used by StudentExternalProfileService.
     */
    public LeetcodeResponse getProfile(String username) {
        return getLeetcodeDetails(username);
    }

    /**
     * Existing method kept for backward compatibility.
     */
    public LeetcodeResponse getLeetcodeDetails(String username) {

        if (username == null || username.isBlank()) {
            return empty(username);
        }

        String query = """
                query getUserProfile($username: String!) {
                    matchedUser(username: $username) {
                        username

                        profile {
                            realName
                        }

                        submitStatsGlobal {
                            acSubmissionNum {
                                difficulty
                                count
                            }
                        }
                    }
                }
                """;

        Map<String, Object> variables = new HashMap<>();
        variables.put("username", username.trim());

        Map<String, Object> body = new HashMap<>();
        body.put("query", query);
        body.put("variables", variables);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        try {

            ResponseEntity<Map> response =
                    restTemplate.postForEntity(
                            "https://leetcode.com/graphql/",
                            request,
                            Map.class
                    );

            return parseResponse(
                    username,
                    response.getBody()
            );

        } catch (Exception e) {

            System.err.println(
                    "LeetCode API error: "
                            + e.getMessage()
            );

            return empty(username);
        }
    }

    @SuppressWarnings("unchecked")
    private LeetcodeResponse parseResponse(
            String username,
            Map<String, Object> response
    ) {

        if (response == null) {
            return empty(username);
        }

        Map<String, Object> data =
                (Map<String, Object>) response.get("data");

        if (data == null) {
            return empty(username);
        }

        Map<String, Object> matchedUser =
                (Map<String, Object>) data.get("matchedUser");

        if (matchedUser == null) {
            return empty(username);
        }

        String actualUsername =
                String.valueOf(
                        matchedUser.getOrDefault(
                                "username",
                                username
                        )
                );

        int easy = 0;
        int medium = 0;
        int hard = 0;

        Map<String, Object> submitStats =
                (Map<String, Object>)
                        matchedUser.get("submitStatsGlobal");

        if (submitStats != null) {

            List<Map<String, Object>> submissions =
                    (List<Map<String, Object>>)
                            submitStats.get("acSubmissionNum");

            if (submissions != null) {

                for (Map<String, Object> item : submissions) {

                    String difficulty =
                            String.valueOf(
                                    item.get("difficulty")
                            );

                    int count =
                            item.get("count") instanceof Number
                                    ? ((Number) item.get("count"))
                                    .intValue()
                                    : 0;

                    switch (difficulty) {

                        case "Easy":
                            easy = count;
                            break;

                        case "Medium":
                            medium = count;
                            break;

                        case "Hard":
                            hard = count;
                            break;

                        default:
                            break;
                    }
                }
            }
        }

        int total = easy + medium + hard;

        int score = calculateScore(
                easy,
                medium,
                hard
        );

        return new LeetcodeResponse(
                true,
                actualUsername,
                total,
                easy,
                medium,
                hard,
                score,
                "https://leetcode.com/u/"
                        + actualUsername
                        + "/"
        );
    }

    private int calculateScore(
            int easy,
            int medium,
            int hard
    ) {

        double score =
                Math.min(easy * 0.10, 20)
                        + Math.min(medium * 0.40, 40)
                        + Math.min(hard * 1.00, 40);

        return (int) Math.min(
                100,
                Math.round(score)
        );
    }

    private LeetcodeResponse empty(String username) {

        return new LeetcodeResponse(
                false,
                username,
                0,
                0,
                0,
                0,
                0,
                null
        );
    }
}