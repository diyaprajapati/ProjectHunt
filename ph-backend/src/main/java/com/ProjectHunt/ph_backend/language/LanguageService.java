package com.ProjectHunt.ph_backend.language;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class LanguageService {

    private final LanguageRepository languageRepository;

    public Set<Language> getAllLanguages() {
        return (Set<Language>) languageRepository.findAll();
    }

    public Set<Language> getAllLanguagesById(Set<Long> ids) {
        return languageRepository.findAllById(ids);
    }
}
