package com.ProjectHunt.ph_backend.config;

import com.ProjectHunt.ph_backend.language.LanguageSeeder;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseInitializer implements ApplicationRunner {
    private final LanguageSeeder languageSeeder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        languageSeeder.run();
    }
}
