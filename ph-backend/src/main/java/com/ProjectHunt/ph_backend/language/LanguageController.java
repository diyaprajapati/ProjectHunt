package com.ProjectHunt.ph_backend.language;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/languages")
public class LanguageController {

    @Autowired
    private LanguageService languageService;

    // Endpoint to add a new language
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<String> createLanguage(@RequestBody LanguageRequest languageRequest) {
        Language language = new Language();
        language.setName(languageRequest.getName());
        languageService.saveLanguage(language);
        return ResponseEntity.ok("Language created successfully!");
    }

    // Get language by ID
    @GetMapping("/{languageId}")
    public ResponseEntity<Language> getLanguage(@PathVariable Long languageId) {
        Language language = languageService.getLanguageById(languageId);
        return ResponseEntity.ok(language);
    }

    // Get all languages
    @GetMapping
    public ResponseEntity<List<Language>> getAllLanguages() {
        List<Language> languages = languageService.getAllLanguages();
        return ResponseEntity.ok(languages);
    }

}