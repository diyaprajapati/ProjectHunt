package com.ProjectHunt.ph_backend.project;

import com.ProjectHunt.ph_backend.user.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String websiteLink;
    private String language;
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and setters
}
