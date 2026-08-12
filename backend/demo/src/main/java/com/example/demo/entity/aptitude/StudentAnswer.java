package com.example.demo.entity.aptitude;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_answer",
        uniqueConstraints = @UniqueConstraint(columnNames = {"assignment_id", "question_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id", nullable = false)
    private TestAssignment assignment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private AptitudeQuestion question;

    @Column(length = 500)
    private String selectedOption;
}
