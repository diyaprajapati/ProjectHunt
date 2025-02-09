package com.ProjectHunt.ph_backend.project;

import com.ProjectHunt.ph_backend.language.LanguageService;
import com.ProjectHunt.ph_backend.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private LanguageService languageService;

//    @GetMapping
//    public ResponseEntity<List<Project>> getProjects() {
//        return ResponseEntity.ok(projectService.getAllProjects());
//    }

    @GetMapping("/all")
    public List<ProjectDTO> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return projects.stream().map(project -> new ProjectDTO(
                project.getId(),
                project.getName(),
                project.getWebsiteLink(),
                project.getDescription(),
                project.getUpvoteCount(),
                project.getCreatedBy()
        )).collect(Collectors.toList());
    }

    @GetMapping("/user")
    public List<ProjectDTO> getProjectsOfUser(@AuthenticationPrincipal User user) {
        List<Project> projects = projectService.getProjectsByUserId(user.getId());
        return projects.stream()
                .map(project -> new ProjectDTO(
                        project.getId(),
                        project.getName(),
                        project.getWebsiteLink(),
                        project.getDescription(),
                        project.getUpvoteCount(),
                        project.getCreatedBy()
                ))
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<String> createProject(@RequestBody ProjectRequest projectRequest, @AuthenticationPrincipal User user) {
        Project project = Project.builder()
                .user(user)
                .name(projectRequest.getTitle())
                .description(projectRequest.getDescription())
                .websiteLink(projectRequest.getWebsiteLink())
                .languages(languageService.getAllLanguagesById(projectRequest.getLanguage()))
                .createdBy(projectRequest.getCreatedBy())
                .build();
        projectService.createProject(project);
        return ResponseEntity.ok("Go ahead, you did your project ");
    }
}
