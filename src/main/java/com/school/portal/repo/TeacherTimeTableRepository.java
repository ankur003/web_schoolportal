package com.school.portal.repo;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.school.portal.domain.TeacherTimeTable;
import com.school.portal.dto.TeacherTimeTableDTO;
import com.school.portal.enums.AcademicYear;

public interface TeacherTimeTableRepository extends JpaRepository<TeacherTimeTable, Long> {

    @Query("SELECT t FROM TeacherTimeTable t WHERE t.teacherUuid = :teacherUuid AND t.dayOfWeek = :dayOfWeek " +
            "AND ((:startTime BETWEEN t.startTime AND t.endTime) OR (:endTime BETWEEN t.startTime AND t.endTime) " +
            "OR (t.startTime BETWEEN :startTime AND :endTime)) AND t.academicYear = :academicYear")
    List<TeacherTimeTable> findOverlappingSlots(
            @Param("teacherUuid") String teacherUuid,
            @Param("dayOfWeek") String dayOfWeek,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("academicYear") AcademicYear academicYear
    );

    void deleteByTeacherTimetableUuid(String teacherTimetableUuid);


  @Query("SELECT new com.school.portal.dto.TeacherTimeTableDTO(" +
          "t.id, t.teacherUuid, t.teacherTimetableUuid, " +
          "t.masterClassUuid, t.masterSectionUuid, t.subjectName, t.dayOfWeek, " +
          "t.startTime, t.endTime, t.roomNo, " +
          "u.fullName, mc.className, ms.sectionName, t.academicYear) " +
          "FROM TeacherTimeTable t " +
          "JOIN User u ON t.teacherUuid = u.userUuid " +
          "JOIN MasterClass mc ON t.masterClassUuid = mc.masterClassUuid " +
          "LEFT JOIN MasterSection ms ON t.masterSectionUuid = ms.masterSectionUuid  where t.academicYear = :academicYear")
  List<TeacherTimeTableDTO> findAllWithDetails(@Param("academicYear") AcademicYear academicYear);

  @Query("SELECT new com.school.portal.dto.TeacherTimeTableDTO(" +
          "t.id, t.teacherUuid, t.teacherTimetableUuid, " +
          "t.masterClassUuid, t.masterSectionUuid, t.subjectName, t.dayOfWeek, " +
          "t.startTime, t.endTime, t.roomNo, " +
          "u.fullName, mc.className, ms.sectionName, t.academicYear) " +
          "FROM TeacherTimeTable t " +
          "JOIN User u ON t.teacherUuid = u.userUuid " +
          "JOIN MasterClass mc ON t.masterClassUuid = mc.masterClassUuid " +
          "LEFT JOIN MasterSection ms ON t.masterSectionUuid = ms.masterSectionUuid " +
          "WHERE t.teacherUuid = :teacherUuid  AND t.academicYear = :academicYear")
  List<TeacherTimeTableDTO> findByTeacherUuid(@Param("teacherUuid") String teacherUuid, @Param("academicYear") AcademicYear academicYear);

  @Query("SELECT new com.school.portal.dto.TeacherTimeTableDTO(" +
          "t.id, t.teacherUuid, t.teacherTimetableUuid, " +
          "t.masterClassUuid, t.masterSectionUuid, t.subjectName, t.dayOfWeek, " +
          "t.startTime, t.endTime, t.roomNo, " +
          "u.fullName, mc.className, ms.sectionName, t.academicYear) " +
          "FROM TeacherTimeTable t " +
          "JOIN User u ON t.teacherUuid = u.userUuid " +
          "JOIN MasterClass mc ON t.masterClassUuid = mc.masterClassUuid " +
          "LEFT JOIN MasterSection ms ON t.masterSectionUuid = ms.masterSectionUuid " +
          "WHERE t.masterClassUuid = :classUuid  AND t.academicYear = :academicYear")
  List<TeacherTimeTableDTO> findByClassUuid(@Param("classUuid") String classUuid, @Param("academicYear") AcademicYear academicYear);

    @Query("SELECT new com.school.portal.dto.TeacherTimeTableDTO(" +
            "t.id, t.teacherUuid, t.teacherTimetableUuid, " +
            "t.masterClassUuid, t.masterSectionUuid, t.subjectName, t.dayOfWeek, " +
            "t.startTime, t.endTime, t.roomNo, " +
            "u.fullName, mc.className, ms.sectionName, t.academicYear) " +
            "FROM TeacherTimeTable t " +
            "JOIN User u ON t.teacherUuid = u.userUuid " +
            "JOIN MasterClass mc ON t.masterClassUuid = mc.masterClassUuid " +
            "LEFT JOIN MasterSection ms ON t.masterSectionUuid = ms.masterSectionUuid " +
            "WHERE t.masterClassUuid = :classUuid " +
            "AND (:sectionUuid IS NULL OR t.masterSectionUuid = :sectionUuid)  AND t.academicYear = :academicYear")
    List<TeacherTimeTableDTO> findByClassAndOptionalSection(@Param("classUuid") String classUuid,
                                                            @Param("sectionUuid") String sectionUuid,
                                                            @Param("academicYear") AcademicYear academicYear);


  @Query("SELECT new com.school.portal.dto.TeacherTimeTableDTO(" +
          "t.id, t.teacherUuid, t.teacherTimetableUuid, " +
          "t.masterClassUuid, t.masterSectionUuid, t.subjectName, t.dayOfWeek, " +
          "t.startTime, t.endTime, t.roomNo, " +
          "u.fullName, mc.className, ms.sectionName, t.academicYear) " +
          "FROM TeacherTimeTable t " +
          "JOIN User u ON t.teacherUuid = u.userUuid " +
          "JOIN MasterClass mc ON t.masterClassUuid = mc.masterClassUuid " +
          "LEFT JOIN MasterSection ms ON t.masterSectionUuid = ms.masterSectionUuid " +
          "WHERE t.dayOfWeek = :dayOfWeek  AND t.academicYear = :academicYear")
  List<TeacherTimeTableDTO> findByDayOfWeek(@Param("dayOfWeek") String dayOfWeek,
		  @Param("academicYear") AcademicYear academicYear);

  @Query("SELECT new com.school.portal.dto.TeacherTimeTableDTO(" +
          "t.id, t.teacherUuid, t.teacherTimetableUuid, " +
          "t.masterClassUuid, t.masterSectionUuid, t.subjectName, t.dayOfWeek, " +
          "t.startTime, t.endTime, t.roomNo, " +
          "u.fullName, mc.className, ms.sectionName, t.academicYear) " +
          "FROM TeacherTimeTable t " +
          "JOIN User u ON t.teacherUuid = u.userUuid " +
          "JOIN MasterClass mc ON t.masterClassUuid = mc.masterClassUuid " +
          "LEFT JOIN MasterSection ms ON t.masterSectionUuid = ms.masterSectionUuid " +
          "WHERE t.teacherTimetableUuid = :uuid AND t.academicYear = :academicYear")
  Optional<TeacherTimeTableDTO> findByTeacherTimeTableUuid(@Param("uuid") String uuid,
		  @Param("academicYear") AcademicYear academicYear);


}
