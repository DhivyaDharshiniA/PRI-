package com.example.demo.entity.coding;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "coding_test")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodingTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false)
    private Integer durationMinutes;

    @Column(nullable = false)
    private String createdByUsername;

    @Column(nullable = false)
    private LocalDateTime publishedAt;

    /** The Placement Cell decides when scores become visible to students. */
    @Builder.Default
    @Column(nullable = false)
    private boolean resultsPublished = false;
}
