package com.example.demo.repository;

import com.example.demo.entity.coding.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestCaseRepository extends JpaRepository<TestCase, Long> {

    List<TestCase> findByQuestionIdOrderByOrderIndexAsc(Long questionId);

    List<TestCase> findByQuestionIdAndHiddenFalseOrderByOrderIndexAsc(Long questionId);
}
