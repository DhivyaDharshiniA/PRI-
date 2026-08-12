package com.example.demo.repository;

import com.example.demo.entity.aptitude.AptitudeQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AptitudeQuestionRepository extends JpaRepository<AptitudeQuestion, Long> {
    List<AptitudeQuestion> findByTestIdOrderByOrderIndexAsc(Long testId);
}
