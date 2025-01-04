package com.ProjectHunt.ph_backend.language;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface  LanguageRepository extends JpaRepository<Language, Long> {
    @Query("SELECT DISTINCT l FROM Language l WHERE l.id IN :ids")
    Set<Language> findAllByIds(@Param("ids") Set<Long> languageIds);
}
