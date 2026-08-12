package com.example.demo.entity.coding;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "coding_test_case")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private CodingQuestion question;

    @Lob
    private String input;

    @Lob
    @Column(nullable = false)
    private String expectedOutput;

    /** Hidden test cases are never shown to the student, before or after submit. */
    @Column(nullable = false)
    private boolean hidden;

    @Column(nullable = false)
    private Integer orderIndex;
}
