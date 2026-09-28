package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "communication_assessments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunicationAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Student who attempted the assessment.
     */
    @Column(nullable = false)
    private Long studentId;

    /*
     * Focus area selected by the student.
     */
    @Column(nullable = false, length = 100)
    private String category;

    /*
     * Final communication score: 0 - 100.
     */
    @Column
    private Integer overallScore;

    /*
     * AI generated overall feedback.
     */
    @Column(columnDefinition = "TEXT")
    private String overallSummary;

    /*
     * Number of questions answered.
     */
    @Column(nullable = false)
    private Integer questionCount;

    /*
     * Total duration used by the student.
     */
    @Column
    private Integer totalDurationSeconds;

    /*
     * Whether the assessment was successfully scored.
     */
    @Column(nullable = false)
    private Boolean scored;

    @Column(nullable = false)
    private LocalDateTime attemptedAt;
}