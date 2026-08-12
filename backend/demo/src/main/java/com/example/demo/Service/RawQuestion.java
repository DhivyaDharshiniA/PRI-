package com.example.demo.Service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RawQuestion {
    private String question;
    private String answer;
    private List<String> options;
    private String explanation;
    private String topic; // set locally, not from the API
}
