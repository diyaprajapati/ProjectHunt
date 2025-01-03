package com.ProjectHunt.ph_backend.comment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    // Add custom queries if needed
}
