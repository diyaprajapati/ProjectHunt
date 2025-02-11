package com.ProjectHunt.ph_backend.language;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}