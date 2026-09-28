//////package com.example.demo.entity;
//////
//////import jakarta.persistence.*;
//////import lombok.*;
//////import com.example.demo.entity.User;
//////
//////@Entity
//////@Getter
//////@Setter
//////@NoArgsConstructor
//////@AllArgsConstructor
//////public class StudentProfile {
//////
//////    @Id
//////    @GeneratedValue(strategy = GenerationType.IDENTITY)
//////    private Long id;
//////
//////    @OneToOne
//////    @JoinColumn(name = "user_id")
//////    private User user;
//////
//////    @Column(name = "github_username")
//////    private String githubUsername;
//////
//////    @Column(name = "leetcode_username")
//////    private String leetcodeUsername;
//////}
////
////package com.example.demo.entity;
////
////import com.fasterxml.jackson.annotation.JsonBackReference;
////import jakarta.persistence.*;
////import lombok.*;
////
////@Entity
////@Table(name = "student_profiles")
////@Data
////@Getter
////@Setter
////@NoArgsConstructor
////@AllArgsConstructor
////public class StudentProfile {
////
////    @Id
////    @GeneratedValue(strategy = GenerationType.IDENTITY)
////    private Long id;
////
////    // =========================================================
////    // USER RELATIONSHIP
////    // =========================================================
////
////    @OneToOne
////    @JoinColumn(name = "user_id", unique = true)
////    @JsonBackReference
////    private User user;
////
////    // =========================================================
////    // YOUR EXISTING STUDENT PROFILE FIELDS
////    // =========================================================
////
////    // Keep your existing fields here
////    // Example:
////
////    private String firstName;
////    private String lastName;
////
////    private String email;
////    private String phone;
////
////    private String department;
////    private String branch;
////
////    private String year;
////
////    // =========================================================
////    // EXTERNAL CODING PROFILES
////    // =========================================================
////
////    @Column(name = "github_username")
////    private String githubUsername;
////
////    @Column(name = "leetcode_username")
////    private String leetcodeUsername;
////}
//
//package com.example.demo.entity;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Table(
//        name = "student_profile",
//        uniqueConstraints = {
//                @UniqueConstraint(columnNames = "user_id")
//        }
//)
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class StudentProfile {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    // ============================================================
//    // USER
//    // ============================================================
//
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(
//            name = "user_id",
//            nullable = false,
//            unique = true
//    )
//    @JsonBackReference
//    private User user;
//
//    // ============================================================
//    // BASIC INFORMATION
//    // ============================================================
//
//    @Column(name = "first_name")
//    private String firstName;
//
//    @Column(name = "last_name")
//    private String lastName;
//
//    @Column(name = "email")
//    private String email;
//
//    @Column(name = "phone")
//    private String phone;
//
//    // ============================================================
//    // EDUCATION
//    // ============================================================
//
//    @Column(name = "department")
//    private String department;
//
//    @Column(name = "branch")
//    private String branch;
//
//    @Column(name = "year")
//    private Integer year;
//
//    // ============================================================
//    // EXTERNAL CODING PROFILES
//    // ============================================================
//
//    @Column(name = "github_username")
//    private String githubUsername;
//
//    @Column(name = "leetcode_username")
//    private String leetcodeUsername;
//}

package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "student_profile",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "user_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    @JsonBackReference
    private User user;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "department")
    private String department;

    @Column(name = "branch")
    private String branch;

    @Column(name = "year")
    private Integer year;

    @Column(name = "github_username")
    private String githubUsername;

    @Column(name = "leetcode_username")
    private String leetcodeUsername;
}