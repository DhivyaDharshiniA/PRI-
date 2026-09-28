package com.example.demo.repository;

import com.example.demo.entity.CommunicationAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunicationAssessmentRepository
        extends JpaRepository<CommunicationAssessment, Long> {

    List<CommunicationAssessment> findByStudentIdOrderByAttemptedAtDesc(Long studentId);

    Optional<CommunicationAssessment> findTopByStudentIdOrderByAttemptedAtDesc(Long studentId);

    long countByStudentId(Long studentId);

    long countByStudentIdAndScoredTrue(Long studentId);
}