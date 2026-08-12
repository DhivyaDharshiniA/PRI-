package com.example.demo.repository;

import com.example.demo.entity.coding.CodingTestAssignment;
import com.example.demo.entity.coding.ResumeDecision;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CodingTestAssignmentRepository extends JpaRepository<CodingTestAssignment, Long> {

    Optional<CodingTestAssignment> findByTestIdAndStudentUsername(Long testId, String studentUsername);

    List<CodingTestAssignment> findByStudentUsernameOrderByIdDesc(String studentUsername);

    List<CodingTestAssignment> findByTestId(Long testId);

    List<CodingTestAssignment> findByResumeDecision(ResumeDecision resumeDecision);

    List<CodingTestAssignment> findByTestIdAndResumeDecision(Long testId, ResumeDecision resumeDecision);
}
