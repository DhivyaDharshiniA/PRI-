package com.example.demo.entity.coding;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "coding_question")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodingQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_id", nullable = false)
    private CodingTest test;

    @Column(nullable = false, length = 200)
    private String title;

    @Lob
    @Column(nullable = false)
    private String description;

    /** EASY / MEDIUM / HARD -- free text, kept simple on purpose. */
    @Column(length = 20)
    private String difficulty;

    @Column(nullable = false)
    private Integer points;

    @Lob
    private String constraintsText;

    @Column(nullable = false)
    private Integer orderIndex;
}
