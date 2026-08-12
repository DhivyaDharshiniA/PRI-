package com.example.demo.Service;

import java.util.List;

/**
 * INTEGRATION SEAM.
 * Your project already has a User/Student table + auth. Implement this interface
 * with a bean that reads usernames of all users with role STUDENT from YOUR
 * existing repository, e.g.:
 *
 * <pre>
 * {@literal @}Service
 * public class JpaStudentDirectory implements StudentDirectory {
 *     private final UserRepository userRepository; // your existing repo
 *     public List<String> findAllStudentUsernames() {
 *         return userRepository.findByRole(Role.STUDENT)
 *                 .stream().map(User::getUsername).toList();
 *     }
 * }
 * </pre>
 *
 * A no-op fallback bean is provided (NoOpStudentDirectory) so the module compiles
 * out of the box; replace it by defining your own StudentDirectory bean, which
 * Spring will prefer via {@literal @}Primary.
 */
public interface StudentDirectory {
    List<String> findAllStudentUsernames();
}
