package com.example.demo.Service;

import com.example.demo.config.AptitudeProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.InputStream;
import java.time.Duration;
import java.util.*;

/**
 * Fetches live aptitude MCQs from the public aptitude-gold.vercel.app API
 * (https://github.com/Thiru-kumaran-R/Aptitude-API, MIT licensed, no API key
 * required). Since it's a free community API its uptime/shape aren't
 * guaranteed, so this service:
 *   1. Round-robins across all documented topics for variety.
 *   2. De-duplicates by question text.
 *   3. Tops up from a bundled local fallback bank if the API is slow,
 *      down, or returns fewer questions than requested, so "Publish"
 *      never fails in front of an admin.
 */
@Slf4j
@Service
public class ExternalAptitudeQuestionService {

    private final WebClient webClient;
    private final AptitudeProperties properties;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ExternalAptitudeQuestionService(WebClient webClient, AptitudeProperties properties) {
        this.webClient = webClient;
        this.properties = properties;
    }

    public List<RawQuestion> fetchQuestions(int count) {
        Map<String, RawQuestion> uniqueByText = new LinkedHashMap<>();

        List<String> configuredTopics = properties.getQuestionSource().getTopics();
        List<String> topicCycle = configuredTopics == null || configuredTopics.isEmpty()
                ? List.of("Random")
                : configuredTopics;

        int topicIdx = 0;
        int attempts = 0;
        int maxTotalAttempts = properties.getQuestionSource().getMaxAttemptsPerTopic() * topicCycle.size();

        while (uniqueByText.size() < count && attempts < maxTotalAttempts) {
            String topic = topicCycle.get(topicIdx % topicCycle.size());
            topicIdx++;
            attempts++;
            try {
                List<RawQuestion> fetched = fetchFromTopic(topic);
                for (RawQuestion q : fetched) {
                    if (isValid(q) && !uniqueByText.containsKey(q.getQuestion().trim())) {
                        q.setTopic(topic);
                        uniqueByText.put(q.getQuestion().trim(), q);
                    }
                }
            } catch (Exception ex) {
                log.warn("Aptitude source '{}' failed on attempt {}: {}", topic, attempts, ex.getMessage());
            }
        }

        if (uniqueByText.size() < count) {
            log.warn("External API returned only {} unique questions after {} attempts; topping up from local fallback bank.",
                    uniqueByText.size(), attempts);
            topUpFromFallback(uniqueByText, count);
        }

        List<RawQuestion> result = new ArrayList<>(uniqueByText.values());
        Collections.shuffle(result);
        return result.subList(0, Math.min(count, result.size()));
    }

    private List<RawQuestion> fetchFromTopic(String topic) {
        String url = properties.getQuestionSource().getBaseUrl() + "/" + topic;
        String body = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .timeout(Duration.ofMillis(properties.getQuestionSource().getRequestTimeoutMs()))
                .onErrorResume(e -> Mono.empty())
                .block();

        if (body == null || body.isBlank()) {
            return List.of();
        }
        return parseFlexible(body);
    }

    /** The API's response shape isn't formally documented, so parse defensively:
     * it may be a single object or an array of objects. */
    private List<RawQuestion> parseFlexible(String body) {
        try {
            JsonNode root = objectMapper.readTree(body);
            List<RawQuestion> out = new ArrayList<>();
            if (root.isArray()) {
                for (JsonNode node : root) {
                    RawQuestion rq = toRawQuestion(node);
                    if (rq != null) out.add(rq);
                }
            } else if (root.isObject()) {
                RawQuestion rq = toRawQuestion(root);
                if (rq != null) out.add(rq);
            }
            return out;
        } catch (Exception e) {
            log.debug("Could not parse aptitude API response: {}", e.getMessage());
            return List.of();
        }
    }

    private RawQuestion toRawQuestion(JsonNode node) {
        if (node == null || !node.has("question")) return null;
        String question = node.path("question").asText(null);
        String answer = node.path("answer").asText(null);
        String explanation = node.path("explanation").asText(null);
        List<String> options = new ArrayList<>();
        JsonNode optionsNode = node.path("options");
        if (optionsNode.isArray()) {
            optionsNode.forEach(o -> options.add(o.asText()));
        }
        if (question == null || answer == null || options.isEmpty()) return null;
        return new RawQuestion(question, answer, options, explanation, null);
    }

    private boolean isValid(RawQuestion q) {
        return q != null
                && q.getQuestion() != null && !q.getQuestion().isBlank()
                && q.getAnswer() != null && !q.getAnswer().isBlank()
                && q.getOptions() != null && q.getOptions().size() >= 2
                && q.getOptions().contains(q.getAnswer());
    }

    @SuppressWarnings("unchecked")
    private void topUpFromFallback(Map<String, RawQuestion> uniqueByText, int count) {
        try (InputStream is = new ClassPathResource("fallback-aptitude-questions.json").getInputStream()) {
            List<Map<String, Object>> raw = objectMapper.readValue(is, List.class);
            Collections.shuffle(raw);
            for (Map<String, Object> m : raw) {
                if (uniqueByText.size() >= count) break;
                String question = (String) m.get("question");
                if (question == null || uniqueByText.containsKey(question.trim())) continue;
                RawQuestion rq = new RawQuestion(
                        question,
                        (String) m.get("answer"),
                        (List<String>) m.get("options"),
                        (String) m.get("explanation"),
                        (String) m.getOrDefault("topic", "General")
                );
                uniqueByText.put(question.trim(), rq);
            }
        } catch (Exception e) {
            log.error("Failed to load local fallback question bank", e);
        }
    }
}
