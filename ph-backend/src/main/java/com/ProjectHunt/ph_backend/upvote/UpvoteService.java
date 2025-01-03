package com.ProjectHunt.ph_backend.upvote;

import com.ProjectHunt.ph_backend.project.Project;
import com.ProjectHunt.ph_backend.project.ProjectRepository;
import com.ProjectHunt.ph_backend.user.User;
import com.ProjectHunt.ph_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpvoteService {

    @Autowired
    private UpvoteRepository upvoteRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    public boolean upvoteProject(Long projectId, Integer userId) {
        // Check if the user has already upvoted the project
        if (upvoteRepository.existsByProjectIdAndUserId(projectId, userId)) {
            return false; // User has already upvoted
        }

        // Fetch the existing project and user from the database
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Create a new Upvote entity and set the project and user
        Upvote upvote = new Upvote();
        upvote.setProject(project);
        upvote.setUser(user);

        // Save the upvote to the repository
        upvoteRepository.save(upvote);
        return true;
    }
}
