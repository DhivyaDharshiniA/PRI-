//package com.example.demo.repository;
//
//import com.example.demo.entity.coding.CodingTestAssignment;
//import com.example.demo.entity.coding.ResumeDecision;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface CodingTestAssignmentRepository extends JpaRepository<CodingTestAssignment, Long> {
//
//    Optional<CodingTestAssignment> findByTestIdAndStudentUsername(Long testId, String studentUsername);
//
//    List<CodingTestAssignment> findByStudentUsernameOrderByIdDesc(String studentUsername);
//
//    List<CodingTestAssignment> findByTestId(Long testId);
//
//    List<CodingTestAssignment> findByResumeDecision(ResumeDecision resumeDecision);
//
//    List<CodingTestAssignment> findByTestIdAndResumeDecision(Long testId, ResumeDecision resumeDecision);
//
//    @Query("""
//        SELECT ca
//        FROM CodingTestAssignment ca
//        WHERE ca.studentUsername = :username
//          AND ca.submittedAt IS NOT NULL
//          AND ca.score IS NOT NULL
//          AND ca.totalMarks IS NOT NULL
//          AND ca.totalMarks > 0
//        ORDER BY ca.submittedAt DESC
//    """)
//    List<CodingTestAssignment> findCompletedTestsByUsername(
//            @Param("username") String username
//    );
//
//    List<CodingTestAssignment> findCompletedTestsByIdentifiers(
//            @Param("identifiers") List<String> identifiers
//    );
//}


package com.example.demo.repository;

import com.example.demo.entity.coding.CodingTestAssignment;
import com.example.demo.entity.coding.ResumeDecision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CodingTestAssignmentRepository
        extends JpaRepository<CodingTestAssignment, Long> {

    Optional<CodingTestAssignment> findByTestIdAndStudentUsername(
            Long testId,
            String studentUsername
    );

    List<CodingTestAssignment> findByStudentUsernameOrderByIdDesc(
            String studentUsername
    );

    List<CodingTestAssignment> findByTestId(
            Long testId
    );

    List<CodingTestAssignment> findByResumeDecision(
            ResumeDecision resumeDecision
    );

    List<CodingTestAssignment> findByTestIdAndResumeDecision(
            Long testId,
            ResumeDecision resumeDecision
    );

    /*
     * Get all completed coding tests for any of the
     * student's known identifiers.
     *
     * The CodingTestAssignment entity contains:
     * studentUsername
     *
     * Therefore we explicitly query that field.
     */
    @Query("""
        SELECT ca
        FROM CodingTestAssignment ca
        WHERE ca.studentUsername IN :usernames
          AND ca.submittedAt IS NOT NULL
          AND ca.score IS NOT NULL
          AND ca.totalMarks IS NOT NULL
          AND ca.totalMarks > 0
        ORDER BY ca.submittedAt DESC
    """)
    List<CodingTestAssignment> findCompletedTestsByUsernames(
            @Param("usernames") List<String> usernames
    );
}