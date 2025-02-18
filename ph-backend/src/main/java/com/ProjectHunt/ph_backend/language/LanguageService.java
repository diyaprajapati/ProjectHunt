package com.ProjectHunt.ph_backend.language;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LanguageService {

    private final LanguageRepository languageRepository;

    public List<Language> getAllLanguagesById(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return new ArrayList<>();
        }
        List<Language> languages = new ArrayList<>(languageRepository.findAllByIds(new HashSet<>(ids)));
        if (languages.isEmpty()) {
            throw new RuntimeException("Languages not found with ids: " + ids);
        }
        System.out.println("Found languages: " + languages); // Debug log
        return languages;
    }

    public Language getLanguageById(Long id) {
        return languageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Language not found with id: " + id));
    }

    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }

    public void saveLanguage(Language language) {
        languageRepository.save(language);
    }
}