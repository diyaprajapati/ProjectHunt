package com.ProjectHunt.ph_backend.project;

import com.ProjectHunt.ph_backend.language.LanguageService;
import com.ProjectHunt.ph_backend.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private LanguageService languageService;

    @GetMapping
    public List<Project> getProjects() {
        return projectService.getAllProjects();
    }

    @PostMapping
    public Project createProject(@RequestBody ProjectRequest projectRequest, @AuthenticationPrincipal User user) {
        Project project = Project.builder()
                .user(user)
                .name(projectRequest.getTitle())
                .description(projectRequest.getDescription())
                .websiteLink(projectRequest.getWebsiteLink())
                .languages(languageService.getAllLanguagesById(projectRequest.getLanguage()))
                .build();
        return projectService.createProject(project);
    }
}
