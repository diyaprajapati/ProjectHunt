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

    // @PostMapping("/{projectId}")
    // public ResponseEntity<String> toggleUpvote(@PathVariable Long projectId,
    // @AuthenticationPrincipal User user) {
    // // Check if the user is authenticated
    // if (user == null) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not
    // authenticated");
    // }
    //
    // try {
    // // Call the service to toggle upvote
    // boolean upvoted = upvoteService.toggleUpvote(projectId, user);
    //
    // // Return success message based on action
    // if (upvoted) {
    // return ResponseEntity.ok("Upvote added");
    // } else {
    // return ResponseEntity.ok("Upvote removed");
    // }
    // } catch (IllegalArgumentException e) {
    // // Handle invalid projectId or other invalid inputs
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    // } catch (Exception e) {
    // // Handle any unexpected errors
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error
    // occurred while toggling upvote");
    // }
    // }
    @PostMapping("/{projectId}")
    public ResponseEntity<Map<String, Object>> toggleUpvote(@PathVariable Long projectId,
            @AuthenticationPrincipal User user) {
        boolean upvoted = upvoteService.toggleUpvote(projectId, user);
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Map<String, Object> response = new HashMap<>();
        response.put("message", upvoted ? "Upvote added" : "Upvote removed");
        response.put("upvoteCount", project.getUpvoteCount()); // Send updated count
        response.put("isUpvoted", upvoted);

        return ResponseEntity.ok(response);
    }

//    @GetMapping("/{projectId}/status")
//    public ResponseEntity<Boolean> hasUserUpvoted(
//            @PathVariable Long projectId,
//            @AuthenticationPrincipal User user) {
//        return ResponseEntity.ok(upvoteService.hasUserUpvoted(projectId, user));
//    }

}
