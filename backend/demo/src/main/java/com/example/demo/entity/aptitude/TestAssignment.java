package com.example.demo.entity.aptitude;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "test_assignment",
        uniqueConstraints = @UniqueConstraint(columnNames = {"test_id", "student_username"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_id", nullable = false)
    private AptitudeTest test;

    @Column(name = "student_username", nullable = false)
    private String studentUsername;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssignmentStatus status;

    private LocalDateTime startedAt;

    private LocalDateTime deadline;

    private LocalDateTime submittedAt;

    private Integer score;

    private Integer totalMarks;

    @Enumerated(EnumType.STRING)
    private ViolationType violationType;
}
