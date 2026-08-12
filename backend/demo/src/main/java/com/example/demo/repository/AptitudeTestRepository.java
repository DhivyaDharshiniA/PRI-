package com.example.demo.repository;

import com.example.demo.entity.aptitude.AptitudeTest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AptitudeTestRepository extends JpaRepository<AptitudeTest, Long> {
}
