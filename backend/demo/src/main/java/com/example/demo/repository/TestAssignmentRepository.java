package com.example.demo.repository;

import com.example.demo.entity.aptitude.TestAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TestAssignmentRepository extends JpaRepository<TestAssignment, Long> {

    Optional<TestAssignment> findByTestIdAndStudentUsername(Long testId, String studentUsername);

    List<TestAssignment> findByStudentUsernameOrderByIdDesc(String studentUsername);

    List<TestAssignment> findByTestId(Long testId);
}
