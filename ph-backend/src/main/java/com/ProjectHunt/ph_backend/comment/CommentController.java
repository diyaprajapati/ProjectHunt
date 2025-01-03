package com.ProjectHunt.ph_backend.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public Comment addComment(@RequestParam Long projectId, @RequestParam Integer userId, @RequestParam String content) {
        return commentService.addComment(projectId, userId, content);
    }
}
