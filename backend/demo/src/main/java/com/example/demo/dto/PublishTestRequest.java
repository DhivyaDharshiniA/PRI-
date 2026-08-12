package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PublishTestRequest {
    private String title;               // optional, defaults to "Aptitude Evaluation - <date>"
    private Integer durationMinutes;    // optional, defaults to 45
    private Integer questionCount;      // optional, defaults to 30
}
