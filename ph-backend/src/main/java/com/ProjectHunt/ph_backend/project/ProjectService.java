package com.ProjectHunt.ph_backend.project;

import com.ProjectHunt.ph_backend.language.Language;
import com.ProjectHunt.ph_backend.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private LanguageService languageService;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project createProject(ProjectRequest projectRequest, User user) {
        // Retrieve or create the Language objects
        List<Language> languages = languageService.getAllLanguagesById(projectRequest.getLanguage());

        // If languages don't exist, you can either create them or return an error
        if (languages.isEmpty()) {
            // Handle the case when no languages are found
            throw new RuntimeException("Languages not found!");
        }

        Project project = Project.builder()
                .user(user)
                .name(projectRequest.getTitle())
                .description(projectRequest.getDescription())
                .websiteLink(projectRequest.getWebsiteLink())
                .languages(languages)  // Assign the languages
                .createdBy(projectRequest.getCreatedBy())
                .build();

        return projectRepository.save(project); // Save project with languages
    }
    public List<Project> getProjectsByUserId(Integer userId) {
        return projectRepository.findByUserId(userId);
    }


}