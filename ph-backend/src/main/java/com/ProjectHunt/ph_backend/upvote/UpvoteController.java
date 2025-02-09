package com.ProjectHunt.ph_backend.upvote;

import com.ProjectHunt.ph_backend.project.Project;
import com.ProjectHunt.ph_backend.project.ProjectRepository;
import com.ProjectHunt.ph_backend.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/upvote")
public class UpvoteController {

    @Autowired
    private UpvoteService upvoteService;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UpvoteRepository upvoteRepository;

    @PostMapping("/{projectId}")
    public ResponseEntity<?> toggleUpvote(
            @PathVariable Long projectId,
            @AuthenticationPrincipal User user) {
        try {
            boolean upvoted = upvoteService.toggleUpvote(projectId, user);
            Project project = projectRepository.findById(projectId)
                    .orElseThrow(() -> new RuntimeException("Project not found"));

            Map<String, Object> response = new HashMap<>();
            response.put("message", upvoted ? "Upvote added" : "Upvote removed");
            response.put("upvoteCount", project.getUpvoteCount());
            response.put("isUpvoted", upvoted);

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "An error occurred while processing your request");
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @GetMapping("/{projectId}/status")
    public ResponseEntity<?> hasUserUpvoted(
            @PathVariable Long projectId,
            @AuthenticationPrincipal User user) {
        try {
            Upvote upvote = upvoteRepository.findByProjectIdAndUserId(projectId, user.getId());
            Map<String, Object> response = new HashMap<>();
            response.put("isUpvoted", upvote != null);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "An error occurred while checking upvote status");
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @GetMapping("/project/{projectId}/count")
    public ResponseEntity<?> getUpvoteCount(@PathVariable Long projectId) {
        try {
            Project project = projectRepository.findById(projectId)
                    .orElseThrow(() -> new RuntimeException("Project not found"));

            Map<String, Object> response = new HashMap<>();
            response.put("upvoteCount", project.getUpvoteCount());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "An error occurred while fetching upvote count");
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

}
