package com.example.demo.Service;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Primary
@RequiredArgsConstructor
public class JpaStudentDirectory implements StudentDirectory {

    private final UserRepository userRepository;

    @Override
    public List<String> findAllStudentUsernames() {

        return userRepository.findByRole(Role.STUDENT)
                .stream()
                .map(User::getEmail)
                .toList();
    }
}