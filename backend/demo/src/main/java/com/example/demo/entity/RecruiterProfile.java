package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import com.example.demo.entity.User;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecruiterProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}