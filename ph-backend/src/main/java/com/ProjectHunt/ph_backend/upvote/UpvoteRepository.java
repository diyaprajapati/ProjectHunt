package com.ProjectHunt.ph_backend.upvote;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UpvoteRepository extends JpaRepository<Upvote, Long> {
    boolean existsByProjectIdAndUserId(Long projectId, Integer userId);
}
