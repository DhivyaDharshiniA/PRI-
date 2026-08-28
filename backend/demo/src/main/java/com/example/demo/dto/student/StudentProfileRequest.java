package com.example.demo.dto.student;

import lombok.Data;

@Data
public class StudentProfileRequest {

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