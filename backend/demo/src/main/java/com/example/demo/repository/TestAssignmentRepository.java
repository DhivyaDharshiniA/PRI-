//package com.example.demo.repository;
//
//import com.example.demo.entity.aptitude.TestAssignment;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface TestAssignmentRepository extends JpaRepository<TestAssignment, Long> {
//
//    Optional<TestAssignment> findByTestIdAndStudentUsername(Long testId, String studentUsername);
//
//    List<TestAssignment> findByStudentUsernameOrderByIdDesc(String studentUsername);
//
//    @Query("""
//        SELECT ta
//        FROM TestAssignment ta
//        WHERE ta.studentUsername = :username
//          AND ta.submittedAt IS NOT NULL
//          AND ta.score IS NOT NULL
//          AND ta.totalMarks IS NOT NULL
//          AND ta.totalMarks > 0
//        ORDER BY ta.submittedAt DESC
//    """)
//
//
//    List<TestAssignment> findByTestId(Long testId);
//
//    List<TestAssignment> findCompletedTestsByUsername(
//            @Param("username") String username
//    );
//
//    List<TestAssignment> findCompletedTestsByIdentifiers(
//            @Param("identifiers") List<String> identifiers
//    );
//}


package com.example.demo.repository;

import com.example.demo.entity.aptitude.TestAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TestAssignmentRepository
        extends JpaRepository<TestAssignment, Long> {

    Optional<TestAssignment> findByTestIdAndStudentUsername(
            Long testId,
            String studentUsername
    );

    List<TestAssignment> findByStudentUsernameOrderByIdDesc(
            String studentUsername
    );

    List<TestAssignment> findByTestId(
            Long testId
    );

    /*
     * Get all completed aptitude tests for any of the
     * student's known identifiers.
     *
     * The TestAssignment entity contains:
     * studentUsername
     *
     * Therefore we explicitly query that field.
     */
    @Query("""
        SELECT ta
        FROM TestAssignment ta
        WHERE ta.studentUsername IN :usernames
          AND ta.submittedAt IS NOT NULL
          AND ta.score IS NOT NULL
          AND ta.totalMarks IS NOT NULL
          AND ta.totalMarks > 0
        ORDER BY ta.submittedAt DESC
    """)
    List<TestAssignment> findCompletedTestsByUsernames(
            @Param("usernames") List<String> usernames
    );
}