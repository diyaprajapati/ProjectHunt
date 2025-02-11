package com.ProjectHunt.ph_backend.language;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
public class LanguageService {
    @Autowired
    private LanguageRepository languageRepository;

    public List<Language> getAllLanguagesById(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return new ArrayList<>();
        }
        List<Language> languages = new ArrayList<>(languageRepository.findAllByIds(new HashSet<>(ids)));
        if (languages.isEmpty()) {
            throw new RuntimeException("Languages not found with ids: " + ids);
        }
        return languages;
    }

    public void saveLanguage(Language language) {
        languageRepository.save(language);
    }

}