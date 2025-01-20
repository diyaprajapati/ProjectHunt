package com.ProjectHunt.ph_backend.project;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class ProjectDTO {
    private Long id;
    private String name;
    private String description;
    private String websiteLink;

    public ProjectDTO(Long id, String name, String websiteLink, String description) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.websiteLink = websiteLink;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWebsiteLink() {
        return websiteLink;
    }

    public void setWebsiteLink(String websiteLink) {
        this.websiteLink = websiteLink;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
