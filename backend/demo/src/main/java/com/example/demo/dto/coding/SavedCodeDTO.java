package com.example.demo.dto.coding;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SavedCodeDTO {
    private Long questionId;
    private String language;
    private String code;
    private Integer score;       // non-null if this question has already been scored via submit
    private Integer maxScore;
}
