package com.example.demo.Service;

import com.example.demo.entity.StudentProfile;
import com.example.demo.entity.User;
import com.example.demo.repository.StudentProfileRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentProfileService {

    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;

    public StudentProfileService(
            StudentProfileRepository studentProfileRepository,
            UserRepository userRepository
    ) {
        this.studentProfileRepository = studentProfileRepository;
        this.userRepository = userRepository;
    }

    public StudentProfile getProfile(Long userId) {

        return studentProfileRepository
                .findByUserId(userId)
                .orElse(null);
    }

    public StudentProfile saveProfile(
            Long userId,
            StudentProfile profileData
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found: " + userId
                        )
                );

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(userId)
                        .orElse(new StudentProfile());

        profile.setUser(user);

        profile.setFirstName(
                profileData.getFirstName()
        );

        profile.setLastName(
                profileData.getLastName()
        );

        profile.setEmail(
                profileData.getEmail()
        );

        profile.setPhone(
                profileData.getPhone()
        );

        profile.setDepartment(
                profileData.getDepartment()
        );

        profile.setBranch(
                profileData.getBranch()
        );

        profile.setYear(
                profileData.getYear()
        );

        profile.setGithubUsername(
                profileData.getGithubUsername()
        );

        profile.setLeetcodeUsername(
                profileData.getLeetcodeUsername()
        );

        return studentProfileRepository.save(profile);
    }
}