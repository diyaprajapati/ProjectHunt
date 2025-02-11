package com.ProjectHunt.ph_backend.language;

<<<<<<< HEAD
=======
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
>>>>>>> 2b084b6a7940de29ff6f8089dd74202f7f996c3f
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

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
<<<<<<< HEAD
        if (languages.isEmpty()) {
            throw new RuntimeException("Languages not found with ids: " + ids);
        }
        return languages;
    }

    public void saveLanguage(Language language) {
        languageRepository.save(language);
    }

=======
        System.out.println("Found languages: " + languages); // Debug log
        return languages;
    }

>>>>>>> 2b084b6a7940de29ff6f8089dd74202f7f996c3f
}