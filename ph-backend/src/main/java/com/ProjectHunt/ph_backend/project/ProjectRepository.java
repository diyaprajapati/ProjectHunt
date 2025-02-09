package com.ProjectHunt.ph_backend.project;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUserId(Integer userId);

    @Lock(LockModeType.OPTIMISTIC)
    @Query("SELECT p FROM Project p WHERE p.id = :id")
    Optional<Project> findByIdWithLock(@Param("id") Long id);
}
