package com.school.portal.repo;

import com.school.portal.domain.TeacherTimeTable;
import com.school.portal.dto.TeacherTimeTableDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface TeacherTimeTableRepository extends JpaRepository<TeacherTimeTable, Long> {

    @Query("SELECT t FROM TeacherTimeTable t WHERE t.teacherUuid = :teacherUuid AND t.dayOfWeek = :dayOfWeek " +
            "AND ((:startTime BETWEEN t.startTime AND t.endTime) OR (:endTime BETWEEN t.startTime AND t.endTime) " +
            "OR (t.startTime BETWEEN :startTime AND :endTime))")
    List<TeacherTimeTable> findOverlappingSlots(
            @Param("teacherUuid") String teacherUuid,
            @Param("dayOfWeek") String dayOfWeek,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime
    );

    void deleteByTeacherTimetableUuid(String teacherTimetableUuid);

    List<TeacherTimeTable> findByMasterSectionUuid(String sectionUuid);

  @Query("SELECT new com.school.portal.dto.TeacherTimeTableDTO(" +
          "t.id, t.teacherUuid, t.teacherTimetableUuid, " +
          "t.masterClassUuid, t.masterSectionUuid, t.subjectName, t.dayOfWeek, " +
          "t.startTime, t.endTime, t.roomNo, " +
          "u.fullName, mc.className, ms.sectionName) " +
          "FROM TeacherTimeTable t " +
          "JOIN User u ON t.teacherUuid = u.userUuid " +
          "JOIN MasterClass mc ON t.masterClassUuid = mc.masterClassUuid " +
          "JOIN MasterSection ms ON t.masterSectionUuid = ms.masterSectionUuid")
  List<TeacherTimeTableDTO> findAllWithDetails();

  @Query("SELECT new com.school.portal.dto.TeacherTimeTableDTO(" +
          "t.id, t.teacherUuid, t.teacherTimetableUuid, " +
          "t.masterClassUuid, t.masterSectionUuid, t.subjectName, t.dayOfWeek, " +
          "t.startTime, t.endTime, t.roomNo, " +
          "u.fullName, mc.className, ms.sectionName) " +
          "FROM TeacherTimeTable t " +
          "JOIN User u ON t.teacherUuid = u.userUuid " +
          "JOIN MasterClass mc ON t.masterClassUuid = mc.masterClassUuid " +
          "LEFT JOIN MasterSection ms ON t.masterSectionUuid = ms.masterSectionUuid " +
          "WHERE t.teacherUuid = :teacherUuid")
  List<TeacherTimeTableDTO> findByTeacherUuid(@Param("teacherUuid") String teacherUuid);

  @Query("SELECT new com.school.portal.dto.TeacherTimeTableDTO(" +
          "t.id, t.teacherUuid, t.teacherTimetableUuid, " +
          "t.masterClassUuid, t.masterSectionUuid, t.subjectName, t.dayOfWeek, " +
          "t.startTime, t.endTime, t.roomNo, " +
          "u.fullName, mc.className, ms.sectionName) " +
          "FROM TeacherTimeTable t " +
          "JOIN User u ON t.teacherUuid = u.userUuid " +
          "JOIN MasterClass mc ON t.masterClassUuid = mc.masterClassUuid " +
          "JOIN MasterSection ms ON t.masterSectionUuid = ms.masterSectionUuid " +
          "WHERE t.masterClassUuid = :classUuid")
  List<TeacherTimeTableDTO> findByClassUuid(@Param("classUuid") String classUuid);

    @Query("SELECT new com.school.portal.dto.TeacherTimeTableDTO(" +
            "t.id, t.teacherUuid, t.teacherTimetableUuid, " +
            "t.masterClassUuid, t.masterSectionUuid, t.subjectName, t.dayOfWeek, " +
            "t.startTime, t.endTime, t.roomNo, " +
            "u.fullName, mc.className, ms.sectionName) " +
            "FROM TeacherTimeTable t " +
            "JOIN User u ON t.teacherUuid = u.userUuid " +
            "JOIN MasterClass mc ON t.masterClassUuid = mc.masterClassUuid " +
            "LEFT JOIN MasterSection ms ON t.masterSectionUuid = ms.masterSectionUuid " +
            "WHERE t.masterClassUuid = :classUuid " +
            "AND (:sectionUuid IS NULL OR t.masterSectionUuid = :sectionUuid)")
    List<TeacherTimeTableDTO> findByClassAndOptionalSection(@Param("classUuid") String classUuid,
                                                            @Param("sectionUuid") String sectionUuid);


  @Query("SELECT new com.school.portal.dto.TeacherTimeTableDTO(" +
          "t.id, t.teacherUuid, t.teacherTimetableUuid, " +
          "t.masterClassUuid, t.masterSectionUuid, t.subjectName, t.dayOfWeek, " +
          "t.startTime, t.endTime, t.roomNo, " +
          "u.fullName, mc.className, ms.sectionName) " +
          "FROM TeacherTimeTable t " +
          "JOIN User u ON t.teacherUuid = u.userUuid " +
          "JOIN MasterClass mc ON t.masterClassUuid = mc.masterClassUuid " +
          "JOIN MasterSection ms ON t.masterSectionUuid = ms.masterSectionUuid " +
          "WHERE t.dayOfWeek = :dayOfWeek")
  List<TeacherTimeTableDTO> findByDayOfWeek(@Param("dayOfWeek") String dayOfWeek);

  @Query("SELECT new com.school.portal.dto.TeacherTimeTableDTO(" +
          "t.id, t.teacherUuid, t.teacherTimetableUuid, " +
          "t.masterClassUuid, t.masterSectionUuid, t.subjectName, t.dayOfWeek, " +
          "t.startTime, t.endTime, t.roomNo, " +
          "u.fullName, mc.className, ms.sectionName) " +
          "FROM TeacherTimeTable t " +
          "JOIN User u ON t.teacherUuid = u.userUuid " +
          "JOIN MasterClass mc ON t.masterClassUuid = mc.masterClassUuid " +
          "JOIN MasterSection ms ON t.masterSectionUuid = ms.masterSectionUuid " +
          "WHERE t.teacherTimetableUuid = :uuid")
  Optional<TeacherTimeTableDTO> findByTeacherTimeTableUuid(@Param("uuid") String uuid);


}
