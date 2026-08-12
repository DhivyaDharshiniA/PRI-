package com.example.demo.Service;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * Placeholder so the module compiles standalone. DELETE this class (or make your
 * real implementation {@literal @}Primary) once you wire StudentDirectory to your
 * existing user table -- see StudentDirectory.java for the pattern.
 */
@Service
public class NoOpStudentDirectory implements StudentDirectory {
    @Override
    public List<String> findAllStudentUsernames() {
        return Collections.emptyList();
    }
}
