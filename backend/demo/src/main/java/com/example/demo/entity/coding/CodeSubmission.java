package com.example.demo.entity.coding;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * One row per (assignment, question). Autosave/run only touch language+code.
 * A scored submit fills in passedCount/totalCount/score as well.
 */
@Entity
@Table(name = "coding_submission",
        uniqueConstraints = @UniqueConstraint(columnNames = {"assignment_id", "question_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodeSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id", nullable = false)
    private CodingTestAssignment assignment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private CodingQuestion question;

    @Column(length = 30)
    private String language;

    @Lob
    private String code;

    /** Null until the student actually presses "Submit" for this question. */
    private Integer passedCount;

    private Integer totalCount;

    private Integer score;

    private LocalDateTime lastSavedAt;

    private LocalDateTime lastSubmittedAt;
}
