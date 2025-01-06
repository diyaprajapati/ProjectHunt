package com.ProjectHunt.ph_backend.upvote;

import com.ProjectHunt.ph_backend.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/upvote")
public class UpvoteController {

    @Autowired
    private UpvoteService upvoteService;

    @PostMapping("/{projectId}")
    public ResponseEntity<String> toggleUpvote(@PathVariable Long projectId, @AuthenticationPrincipal User user) {
        boolean upvoted = upvoteService.toggleUpvote(projectId, user);
        if (upvoted) {
            return ResponseEntity.ok("Upvote added");
        } else {
            return ResponseEntity.ok("Upvote removed");
        }
    }
}
