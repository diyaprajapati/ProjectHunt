package com.ProjectHunt.ph_backend.project;

import com.ProjectHunt.ph_backend.language.Language;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@JsonSerialize
public class ProjectDTO {
    private Long id;
    private String name;
    private String description;
    private String websiteLink;
    private List<Language> languages;
    private int upvoteCount;
    private String createdBy;

    public ProjectDTO(Long id, String name, String websiteLink,List<Language> languages, String description, int upvoteCount, String createdBy) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.websiteLink = websiteLink;
        this.languages = languages;
        this.upvoteCount = upvoteCount;
        this.createdBy = createdBy;
    }

}
