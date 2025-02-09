package com.ProjectHunt.ph_backend.project;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonSerialize
public class ProjectDTO {
    private Long id;
    private String name;
    private String description;
    private String websiteLink;
    private int upvoteCount;

    public ProjectDTO(Long id, String name, String websiteLink, String description, int upvoteCount) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.websiteLink = websiteLink;
        this.upvoteCount = upvoteCount;
    }

}
