package com.example.demo.dto.student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileResponse {

    private Long id;

    private Long userId;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String department;

    private String branch;

    private Integer year;

    private String githubUsername;

    private String leetcodeUsername;
}