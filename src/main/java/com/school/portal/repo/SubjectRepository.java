package com.school.portal.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.school.portal.domain.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {
	
	List<Subject> findBySubjectNameAndIsActive(String subjectName, Boolean isActive); 
    
    // Filter subjects with optional parameters
    @Query("SELECT s FROM Subject s " +
           "LEFT JOIN MasterClass mc ON s.masterClassId = mc.masterClassId " +
           "LEFT JOIN MasterSection ms ON s.masterSectionId = ms.masterSectionId " +
           "WHERE (:classUuid IS NULL OR mc.masterClassUuid = :classUuid) " +
           "AND (:sectionUuid IS NULL OR ms.masterSectionUuid = :sectionUuid) " +
           "AND (:subjectId IS NULL OR s.subjectId = :subjectId) " +
           "AND s.isActive = true " +
           "ORDER BY s.subjectName")
    List<Subject> findSubjectsWithFilters(
            @Param("classUuid") String classUuid,
            @Param("sectionUuid") String sectionUuid,
            @Param("subjectId") Integer subjectId);
    
    // Find active subjects only
    List<Subject> findByIsActiveTrue();
    
    // Find subject by ID and active status
    Optional<Subject> findBySubjectIdAndIsActiveTrue(Integer subjectId);

	Subject findBySubjectIdAndIsActive(Integer subjectId, Boolean  isTrue);

	Optional<Subject> findBySubjectNameAndMasterClassIdAndMasterSectionIdAndIsActiveTrue(String subjectName, Long masterClassId,
			Long masterSectionId);

	Optional<Subject> findBySubjectNameAndMasterClassIdAndIsActiveTrue(String subjectName, Long masterClassId);

	List<Subject> findBySubjectNameAndIsActiveTrue(String subjectName);

	List<Subject>  findByMasterClassIdAndIsActiveTrue(Long mcId);

	List<Subject> findByMasterClassIdAndMasterSectionIdAndIsActiveTrue(Long mcId, Long msId);

	
    
}
    
    