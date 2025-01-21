package com.ProjectHunt.ph_backend.project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequest {
    private String title;
    private String description;
    private String websiteLink;
    private List<Long> language;
}
