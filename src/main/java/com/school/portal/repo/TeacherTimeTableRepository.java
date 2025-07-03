package com.school.portal.repo;

import com.school.portal.domain.TeacherTimeTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalTime;
import java.util.List;

public interface TeacherTimeTableRepository extends JpaRepository<TeacherTimeTable, Long> {
    List<TeacherTimeTable> findByTeacherUuid(String teacherUuid);
    List<TeacherTimeTable> findByClassUuid(String classUuid);
    List<TeacherTimeTable> findByDayOfWeek(String dayOfWeek);

    @Query("SELECT t FROM TeacherTimeTable t WHERE t.teacherUuid = :teacherUuid AND t.dayOfWeek = :dayOfWeek " +
            "AND ((:startTime BETWEEN t.startTime AND t.endTime) OR (:endTime BETWEEN t.startTime AND t.endTime) " +
            "OR (t.startTime BETWEEN :startTime AND :endTime))")
    List<TeacherTimeTable> findOverlappingSlots(
            @Param("teacherUuid") String teacherUuid,
            @Param("dayOfWeek") String dayOfWeek,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime
    );
}
