package com.school.portal.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.school.portal.domain.Subject;
import com.school.portal.enums.AcademicYear;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {
	
	List<Subject> findBySubjectNameAndIsActiveAndAcademicYear(String subjectName, Boolean isActive,
			AcademicYear academicYear); 
    
    // Filter subjects with optional parameters
    @Query("SELECT s FROM Subject s " +
           "LEFT JOIN MasterClass mc ON s.masterClassId = mc.masterClassId " +
           "LEFT JOIN MasterSection ms ON s.masterSectionId = ms.masterSectionId " +
           "WHERE (:classUuid IS NULL OR mc.masterClassUuid = :classUuid) " +
           "AND (:sectionUuid IS NULL OR ms.masterSectionUuid = :sectionUuid) " +
           "AND (:subjectId IS NULL OR s.subjectId = :subjectId) " +
           "AND s.isActive = true AND s.academicYear = :academicYear " +
           "ORDER BY s.subjectName")
    List<Subject> findSubjectsWithFilters(
            @Param("classUuid") String classUuid,
            @Param("sectionUuid") String sectionUuid,
            @Param("subjectId") Integer subjectId,
            @Param("academicYear") AcademicYear academicYear);
    
    // Find active subjects only
    List<Subject> findByIsActiveTrueAndAcademicYear(AcademicYear academicYear);
    
    // Find subject by ID and active status
    Optional<Subject> findBySubjectIdAndIsActiveTrueAndAcademicYear(Integer subjectId, AcademicYear academicYear);

	Subject findBySubjectIdAndIsActiveAndAcademicYear(Integer subjectId, Boolean  isTrue, AcademicYear academicYear);

	Optional<Subject> findBySubjectNameAndMasterClassIdAndMasterSectionIdAndIsActiveTrueAndAcademicYear(String subjectName, Long masterClassId,
			Long masterSectionId, AcademicYear academicYear);

	Optional<Subject> findBySubjectNameAndMasterClassIdAndIsActiveTrueAndAcademicYear(String subjectName, Long masterClassId, AcademicYear academicYear);

	List<Subject> findBySubjectNameAndIsActiveTrueAndAcademicYear(String subjectName, AcademicYear academicYear);

	List<Subject>  findByMasterClassIdAndIsActiveTrueAndAcademicYear(Long mcId, AcademicYear academicYear);

	List<Subject> findByMasterClassIdAndMasterSectionIdAndIsActiveTrueAndAcademicYear(Long mcId, Long msId, AcademicYear academicYear);

	List<Subject> findBySubjectNameAndAcademicYearAndIsActive(String subjectName, AcademicYear currentAcademicYear,
			boolean isActive);

}
    
    