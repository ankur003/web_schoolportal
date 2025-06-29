package com.school.portal.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.school.portal.domain.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {
    
    // Find active subjects
    List<Subject> findByIsActiveTrue();
    
    // Find active subjects with pagination
    Page<Subject> findByIsActiveTrue(Pageable pageable);
    
    // Find by subject code (active only)
    Optional<Subject> findBySubjectCodeAndIsActiveTrue(String subjectCode);
    
    // Find by subject name containing (active only)
    List<Subject> findBySubjectNameContainingIgnoreCaseAndIsActiveTrue(String subjectName);
    
    // Find by id and active
    Optional<Subject> findBySubjectIdAndIsActiveTrue(Integer subjectId);
    
    // Check if subject code exists (excluding current subject)
    @Query("SELECT COUNT(s) > 0 FROM Subject s WHERE s.subjectCode = :subjectCode AND s.subjectId != :subjectId AND s.isActive = true")
    boolean existsBySubjectCodeAndSubjectIdNotAndIsActiveTrue(
        @Param("subjectCode") String subjectCode, 
        @Param("subjectId") Integer subjectId
    );
    
    // Soft delete subject
    @Modifying
    @Transactional
    @Query("UPDATE Subject s SET s.isActive = false, s.updatedAt = CURRENT_TIMESTAMP WHERE s.subjectId = :subjectId")
    int softDeleteById(@Param("subjectId") Integer subjectId);
    
    // Restore subject
    @Modifying
    @Transactional
    @Query("UPDATE Subject s SET s.isActive = true, s.updatedAt = CURRENT_TIMESTAMP WHERE s.subjectId = :subjectId")
    int restoreById(@Param("subjectId") Integer subjectId);
}

// SubjectDTO.java
