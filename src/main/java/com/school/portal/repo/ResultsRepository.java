package com.school.portal.repo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.school.portal.domain.Results;
import com.school.portal.enums.ExamType;
import com.school.portal.response.DashboardResultDTO;
import com.school.portal.response.ResultResponseDTO;

@Repository
public interface ResultsRepository extends JpaRepository<Results, Long> {
    
    @Query("SELECT new com.school.portal.response.ResultResponseDTO(" +
           "u.fullName, u.rollNumber, mc.className, mc.masterClassUuid, " +
           "ms.sectionName, ms.masterSectionUuid, s.subjectName, s.subjectId, " +
           "r.marksObtained, s.maxMarks, r.percentage, r.grade, u.userUuid, r.examType) " +
           "FROM Results r " +
           "JOIN r.user u " +
           "JOIN r.subject s " +
           "LEFT JOIN MasterClass mc ON s.masterClassId = mc.masterClassId " +
           "LEFT JOIN MasterSection ms ON s.masterSectionId = ms.masterSectionId " +
           "WHERE (:userUuid IS NULL OR u.userUuid = :userUuid) " +
           "AND (:classUuid IS NULL OR mc.masterClassUuid = :classUuid) " +
           "AND (:sectionUuid IS NULL OR ms.masterSectionUuid = :sectionUuid) " +
           "AND (:examType IS NULL OR r.examType = :examType) " +
           "AND (:isFailed IS NULL OR r.isPassed = :isFailed) " +
           "ORDER BY r.marksObtained DESC")
    List<ResultResponseDTO> findResultsWithFilters(
        @Param("userUuid") String userUuid,
        @Param("classUuid") String classUuid,
        @Param("sectionUuid") String sectionUuid,
        @Param("examType") ExamType examType,
        @Param("isFailed") Boolean isFailed
    );

    @Query("SELECT r FROM Results r " +
           "WHERE r.user.userId = :userId AND r.subject.subjectId = :subjectId " +
           "AND r.examType = :examType")
    Results findByUserAndSubjectAndExamType(
        @Param("userId") Long userId,
        @Param("subjectId") Integer subjectId,
        @Param("examType") ExamType examType
    );

    // Top 3 gainers (highest marks) per class/section
    @Query("SELECT new com.school.portal.response.DashboardResultDTO(" +
           "u.fullName, u.rollNumber, mc.className, mc.masterClassUuid, " +
           "ms.sectionName, ms.masterSectionUuid, s.subjectName, " +
           "r.marksObtained, s.maxMarks, r.percentage, r.grade, 'GAINER' , u.userUuid, r.examType)" +
           "FROM Results r " +
           "JOIN r.user u " +
           "JOIN r.subject s " +
           "LEFT JOIN MasterClass mc ON s.masterClassId = mc.masterClassId " +
           "LEFT JOIN MasterSection ms ON s.masterSectionId = ms.masterSectionId " +
           "WHERE (:classUuid IS NULL OR mc.masterClassUuid = :classUuid) " +
           "AND (:sectionUuid IS NULL OR ms.masterSectionUuid = :sectionUuid) " +
           "AND (:examType IS NULL OR r.examType = :examType) " +
           "AND (:subjectId IS NULL OR s.subjectId = :subjectId) " +
           "ORDER BY mc.masterClassId, ms.masterSectionId, r.marksObtained DESC")
    List<DashboardResultDTO> findTopGainers(
        @Param("classUuid") String classUuid,
        @Param("sectionUuid") String sectionUuid,
        @Param("examType") ExamType examType,
        @Param("subjectId") Integer subjectId
    );

    // Top 3 loosers (lowest marks) per class/section
    @Query("SELECT new com.school.portal.response.DashboardResultDTO(" +
           "u.fullName, u.rollNumber, mc.className, mc.masterClassUuid, " +
           "ms.sectionName, ms.masterSectionUuid, s.subjectName, " +
           "r.marksObtained, s.maxMarks, r.percentage, r.grade, 'LOOSER', u.userUuid, r.examType) " +
           "FROM Results r " +
           "JOIN r.user u " +
           "JOIN r.subject s " +
           "LEFT JOIN MasterClass mc ON s.masterClassId = mc.masterClassId " +
           "LEFT JOIN MasterSection ms ON s.masterSectionId = ms.masterSectionId " +
           "WHERE (:classUuid IS NULL OR mc.masterClassUuid = :classUuid) " +
           "AND (:sectionUuid IS NULL OR ms.masterSectionUuid = :sectionUuid) " +
           "AND (:examType IS NULL OR r.examType = :examType) " +
           "AND (:subjectId IS NULL OR s.subjectId = :subjectId) " +
           "ORDER BY mc.masterClassId, ms.masterSectionId, r.marksObtained ASC")
    List<DashboardResultDTO> findTopLoosers(
        @Param("classUuid") String classUuid,
        @Param("sectionUuid") String sectionUuid,
        @Param("examType") ExamType examType,
        @Param("subjectId") Integer subjectId
    );
}
