package com.example.demo.repository;

import com.example.demo.entity.coding.CodingQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CodingQuestionRepository extends JpaRepository<CodingQuestion, Long> {

    List<CodingQuestion> findByTestIdOrderByOrderIndexAsc(Long testId);
}
