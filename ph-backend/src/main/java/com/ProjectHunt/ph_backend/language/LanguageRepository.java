package com.ProjectHunt.ph_backend.language;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface  LanguageRepository extends JpaRepository<Language, Long> {
    Set<Language> findAllById(Set<Long> languageIds);
}
