package com.example.demo.repository;

import com.example.demo.entity.aptitude.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentAnswerRepository extends JpaRepository<StudentAnswer, Long> {

    List<StudentAnswer> findByAssignmentId(Long assignmentId);

    Optional<StudentAnswer> findByAssignmentIdAndQuestionId(Long assignmentId, Long questionId);
}
