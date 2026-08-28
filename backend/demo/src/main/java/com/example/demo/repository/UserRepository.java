//package com.example.demo.repository;
//
//import com.example.demo.entity.StudentProfile;
//import com.example.demo.entity.User;
//import com.example.demo.entity.Role;
//import java.util.List;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.Optional;
//
//public interface UserRepository
//        extends JpaRepository<User, Long> {
//
//    Optional<User> findByEmail(String email);
//    List<User> findByRole(Role role);
//
//    Optional<StudentProfile> findByUserId(Long userId);
//
//    boolean existsByUserId(Long userId);
//}

package com.example.demo.repository;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByRegisterNumber(String registerNumber);

    boolean existsByEmail(String email);

    boolean existsByRegisterNumber(String registerNumber);

    List<User> findByRole(Role role);
}