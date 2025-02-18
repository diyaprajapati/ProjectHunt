package com.ProjectHunt.ph_backend.language;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class LanguageSeeder implements CommandLineRunner {

    @Autowired
    private LanguageRepository languageRepository;

    private static final List<String> PROGRAMMING_LANGUAGES = Arrays.asList(
            // Popular General-Purpose Languages
            "Java", "Python", "JavaScript", "C++", "C#", "Ruby", "PHP", "Swift", "Go", "Rust",
            // Web Development
            "TypeScript", "HTML", "CSS", "SQL",
            // Mobile Development
            "Kotlin", "Objective-C", "Dart",
            // System Programming
            "C", "Assembly",
            // Functional Programming
            "Scala", "Haskell", "Clojure", "Erlang", "F#",
            // Scripting Languages
            "Perl", "Lua", "Shell", "PowerShell",
            // Data Science & ML
            "R", "MATLAB", "Julia",
            // Other Notable Languages
            "COBOL", "Fortran", "Pascal", "Groovy", "Elixir"
    );

    @Override
    @Transactional
    public void run(String... args) {
        try {
            long count = languageRepository.count();
            System.out.println("Current language count in database: " + count);

            if (count == 0) {
                System.out.println("Starting to seed programming languages...");

                for (String languageName : PROGRAMMING_LANGUAGES) {
                    Language language = new Language();
                    language.setName(languageName);
                    Language savedLanguage = languageRepository.save(language);
                    System.out.println("Saved language: " + savedLanguage.getName() + " with ID: " + savedLanguage.getId());
                }

                long newCount = languageRepository.count();
                System.out.println("Seeding completed. Total languages in database: " + newCount);
            } else {
                System.out.println("Database already contains " + count + " languages. Skipping seeding.");
            }
        } catch (Exception e) {
            System.err.println("Error during seeding: " + e.getMessage());
            e.printStackTrace();
        }
    }
}