//package com.example.demo.entity;
//
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import jakarta.persistence.*;
//import lombok.*;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "users")
//@Data
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    // Common Information
//    @Column(nullable = false)
//    private String fullName;
//
//    @Column(nullable = false, unique = true)
//    private String registerNumber;
//
//    @Column(unique = true)
//    private String email;
//
//    @Column(nullable = false)
//    private String phoneNumber;
//
//    @Column(nullable = false)
//    private String password;
//
//    // STUDENT, RECRUITER, ADMIN
//    @Enumerated(EnumType.STRING)
//    private Role role;
//
//    private boolean enabled = true;
//
//    private boolean verified = false;
//
//    private LocalDateTime createdAt;
//
//    private LocalDateTime updatedAt;
//
//    @PrePersist
//    public void onCreate() {
//        createdAt = LocalDateTime.now();
//        updatedAt = LocalDateTime.now();
//    }
//
//    @PreUpdate
//    public void onUpdate() {
//        updatedAt = LocalDateTime.now();
//    }
//
//    // Student Profile
//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    @JsonManagedReference
//    private StudentProfile studentProfile;
//
//    // Recruiter Profile
//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    @JsonManagedReference
//    private RecruiterProfile recruiterProfile;
//
////    @Column(name = "github_username")
////    private String githubUsername;
//
////    @Column(name = "leetcode_username")
////    private String leetcodeUsername;
//}


package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String registerNumber;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean enabled = true;

    private boolean verified = false;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @OneToOne(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    private StudentProfile studentProfile;

    @OneToOne(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    private RecruiterProfile recruiterProfile;
}