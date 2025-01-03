//package com.ProjectHunt.ph_backend.comment;
//
//import com.ProjectHunt.ph_backend.project.Project;
//import com.ProjectHunt.ph_backend.project.ProjectRepository; // Import ProjectRepository
//import com.ProjectHunt.ph_backend.user.User;
//import com.ProjectHunt.ph_backend.user.UserRepository; // Import UserRepository
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//public class CommentService {
//
//    @Autowired
//    private CommentRepository commentRepository;
//
//    @Autowired
//    private ProjectRepository projectRepository; // Inject the ProjectRepository
//
//    @Autowired
//    private UserRepository userRepository; // Inject the UserRepository
//
//    @Transactional
//    public Comment addComment(Long projectId, Long userId, String content) {
//        // Fetch existing project and user
//        Project project = projectRepository.findById(projectId)
//                .orElseThrow(() -> new IllegalArgumentException("Project not found"));
//
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new IllegalArgumentException("User not found"));
//
//        // Create and set comment details
//        Comment comment = new Comment();
//        comment.setProject(project);
//        comment.setUser(user);
//        comment.setContent(content);
//
//        // Save and return the comment
//        return commentRepository.save(comment);
//    }
//}

package com.ProjectHunt.ph_backend.comment;

import com.ProjectHunt.ph_backend.project.Project;
import com.ProjectHunt.ph_backend.project.ProjectRepository;
import com.ProjectHunt.ph_backend.user.User;
import com.ProjectHunt.ph_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Comment addComment(Long projectId, Integer userId, String content) {
        // Fetch existing project and user
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Create and set comment details
        Comment comment = new Comment();
        comment.setProject(project);
        comment.setUser(user);
        comment.setContent(content);

        // Save and return the comment
        return commentRepository.save(comment);
    }
}
