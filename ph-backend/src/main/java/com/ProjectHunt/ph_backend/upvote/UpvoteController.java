package com.ProjectHunt.ph_backend.upvote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/upvote")
public class UpvoteController {

    @Autowired
    private UpvoteService upvoteService;

    @PostMapping("/project/{projectId}/user/{userId}")
    public ResponseEntity<String> upvoteProject(@PathVariable Long projectId, @PathVariable Integer userId) {
        boolean success = upvoteService.upvoteProject(projectId, userId);
        if (success) {
            return ResponseEntity.ok("Upvote successful!");
        } else {
            return ResponseEntity.status(400).body("You have already upvoted this project.");
        }
    }
}
