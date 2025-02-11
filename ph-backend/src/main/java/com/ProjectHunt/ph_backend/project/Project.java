package com.ProjectHunt.ph_backend.project;

import com.ProjectHunt.ph_backend.language.Language;
import com.ProjectHunt.ph_backend.upvote.Upvote;
import com.ProjectHunt.ph_backend.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "user")
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String websiteLink;
    private String description;

    @Column(columnDefinition = "integer default 0")
    private int upvoteCount = 0;

    @Column(name = "createdBy")
    private String createdBy;

    @Version
    private Long version;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "project_languages", joinColumns = @JoinColumn(name = "project_id"), inverseJoinColumns = @JoinColumn(name = "language_id"))
    private List<Language> languages = new ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Upvote> upvotes = new ArrayList<>();

    // Other fields and methods

    public int getUpvoteCount() {
        return upvotes.size(); // Count the number of upvotes
    }

    public void incrementUpvoteCount() {
        this.upvoteCount++;
    }

    public void decrementUpvoteCount() {
        this.upvoteCount--;
    }

    // Getters and setters
}
