package com.ProjectHunt.ph_backend.language;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

//@Service
//@RequiredArgsConstructor
//public class LanguageService {
//
//    private final LanguageRepository languageRepository;
//
//    public List<Language> getAllLanguages() {
//        return languageRepository.findAll();
//    }
//
//    public List<Language> getAllLanguagesById(List<Long> ids) {
//        return languageRepository.findAllById(ids);
//    }
//}
@Service
public class LanguageService {
    @Autowired
    private LanguageRepository languageRepository;

//    public List<Language> getAllLanguagesById(List<Long> ids) {
//        if (ids == null || ids.isEmpty()) {
//            return new ArrayList<>();
//        }
//        List<Language> languages = languageRepository.findAllById(ids);
//        System.out.println("Found languages: " + languages); // Debug log
//        return languages;
//    }
    public List<Language> getAllLanguagesById(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return new ArrayList<>();
        }
        List<Language> languages = new ArrayList<>(languageRepository.findAllByIds(new HashSet<>(ids)));
        System.out.println("Found languages: " + languages); // Debug log
        return languages;
    }

}