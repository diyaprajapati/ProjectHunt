package com.ProjectHunt.ph_backend.upvote;

import com.ProjectHunt.ph_backend.project.Project;
import com.ProjectHunt.ph_backend.project.ProjectRepository;
import com.ProjectHunt.ph_backend.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpvoteService {

    @Autowired
    private UpvoteRepository upvoteRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public boolean toggleUpvote(Long projectId, User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        Upvote existingUpvote = upvoteRepository.findByProjectIdAndUserId(projectId, user.getId());

        if (existingUpvote != null) {
            // Remove upvote
            upvoteRepository.delete(existingUpvote);
            project.decrementUpvoteCount();
            projectRepository.save(project);
            return false; // Upvote removed
        } else {
            // Add upvote
            Upvote newUpvote = new Upvote();
            newUpvote.setProject(project);
            newUpvote.setUser(user);
            upvoteRepository.save(newUpvote);
            project.incrementUpvoteCount();
            projectRepository.save(project);
            return true; // Upvote added
        }
    }
}