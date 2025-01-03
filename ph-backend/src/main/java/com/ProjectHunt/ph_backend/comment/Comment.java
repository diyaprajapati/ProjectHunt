package com.ProjectHunt.ph_backend.comment;

import com.ProjectHunt.ph_backend.project.Project;
import com.ProjectHunt.ph_backend.user.User;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;  // Project relationship

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // User relationship

    @Column(nullable = false)
    private String content;  // Content of the comment

    // Getters and Setters (Lombok @Data generates these)
}
