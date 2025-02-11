package com.ProjectHunt.ph_backend.project;

import com.ProjectHunt.ph_backend.language.Language;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

//    public Project createProject(Project project) {
//        return projectRepository.save(project);
//    }
public Project createProject(Project project, List<Language> languages) {
    if (languages != null && !languages.isEmpty()) {
        project.setLanguages(languages);
    }
    return projectRepository.save(project);
}

    public List<Project> getProjectsByUserId(Integer userId) {
        return projectRepository.findByUserId(userId);
    }


}
