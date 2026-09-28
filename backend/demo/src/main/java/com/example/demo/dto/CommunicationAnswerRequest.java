package com.example.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommunicationAnswerRequest {

    private String questionId;

    private String category;

    private String questionText;

    private String answerText;

    private Integer durationSeconds;

    private Integer score;

    private String feedback;
}