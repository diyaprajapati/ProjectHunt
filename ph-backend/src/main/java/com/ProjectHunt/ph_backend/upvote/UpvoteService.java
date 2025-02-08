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
        // Validate user
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }

        // Validate project
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        // Check if the user already upvoted the project
        Upvote existingUpvote = upvoteRepository.findByProjectIdAndUserId(projectId, user.getId());

        if (existingUpvote != null) {
            // If upvote exists, remove it (toggle downvote)
            upvoteRepository.delete(existingUpvote);
            return false; // Upvote removed
        }

        // If upvote doesn't exist, create a new upvote
        Upvote newUpvote = new Upvote();
        newUpvote.setProject(project);
        newUpvote.setUser(user);
        upvoteRepository.save(newUpvote);
        return true; // Upvote added
    }

//    public boolean toggleUpvote(Long projectId, User user) {
//        Project project = projectRepository.findById(projectId)
//                .orElseThrow(() -> new RuntimeException("Project not found"));
//
//        // Check if upvote exists
//        Optional<Upvote> existingUpvote = upvoteRepository.findByProjectAndUser(project, user);
//
//        if (existingUpvote.isPresent()) {
//            // Remove upvote if it exists
//            upvoteRepository.delete(existingUpvote.get());
//            project.decrementUpvoteCount();
//            projectRepository.save(project);
//            return false;
//        } else {
//            // Add new upvote
//            Upvote upvote = new Upvote();
//            upvote.setProject(project);
//            upvote.setUser(user);
//            upvoteRepository.save(upvote);
//            project.incrementUpvoteCount();
//            projectRepository.save(project);
//            return true;
//        }
//    }
}