package com.ProjectHunt.ph_backend.language;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LanguageService {

    private final LanguageRepository languageRepository;

    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }

    public List<Language> getAllLanguagesById(List<Long> ids) {
        return languageRepository.findAllById(ids);
    }
}
