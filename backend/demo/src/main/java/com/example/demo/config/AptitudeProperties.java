package com.example.demo.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "aptitude")
@Getter
@Setter
public class AptitudeProperties {

    private QuestionSource questionSource = new QuestionSource();
    private Test test = new Test();

    @Getter
    @Setter
    public static class QuestionSource {
        private String baseUrl;
        private List<String> topics;
        private long requestTimeoutMs = 4000;
        private int maxAttemptsPerTopic = 12;
    }

    @Getter
    @Setter
    public static class Test {
        private int defaultQuestionCount = 30;
        private int defaultDurationMinutes = 45;
    }
}
