package com.example.demo.entity.aptitude;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "aptitude_question")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AptitudeQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_id", nullable = false)
    private AptitudeTest test;

    @Column(nullable = false, length = 1000)
    private String questionText;

    @ElementCollection
    @CollectionTable(name = "aptitude_question_options", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "option_text", length = 500)
    @OrderColumn(name = "option_index")
    private List<String> options;

    @Column(nullable = false, length = 500)
    private String correctAnswer;

    @Column(length = 1500)
    private String explanation;

    @Column(nullable = false)
    private Integer orderIndex;

    private String sourceTopic;
}
