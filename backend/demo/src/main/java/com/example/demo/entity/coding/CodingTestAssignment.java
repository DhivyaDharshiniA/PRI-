package com.example.demo.entity.coding;

import com.example.demo.entity.aptitude.ViolationType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "coding_test_assignment",
        uniqueConstraints = @UniqueConstraint(columnNames = {"test_id", "student_username"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodingTestAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_id", nullable = false)
    private CodingTest test;

    @Column(name = "student_username", nullable = false)
    private String studentUsername;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CodingAssignmentStatus status;

    private LocalDateTime startedAt;

    private LocalDateTime deadline;

    private LocalDateTime submittedAt;

    private Integer score;

    private Integer totalMarks;

    // ---------- proctoring / violation ----------

    @Enumerated(EnumType.STRING)
    private ViolationType violationType;

    private LocalDateTime violationOccurredAt;

    /** Data-URL (base64) screenshot captured by the browser at the moment of violation. */
    @Lob
    private String violationScreenshot;

    /** How much time was left on the clock when the violation fired, so an
     * approved resume can restore a fair remaining duration instead of a
     * fresh full-length timer. */
    private Integer remainingSecondsAtViolation;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(nullable = false)
    private ResumeDecision resumeDecision = ResumeDecision.NONE;

    private String resumeDecidedByUsername;

    private LocalDateTime resumeDecidedAt;

    @Builder.Default
    @Column(nullable = false)
    private int resumeCount = 0;
}
