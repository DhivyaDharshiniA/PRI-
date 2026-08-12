package com.example.demo.dto.coding;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PublishCodingTestRequest {
    private String title;
    private Integer durationMinutes;   // defaults to 60 if omitted
    private List<QuestionInput> questions;
}
