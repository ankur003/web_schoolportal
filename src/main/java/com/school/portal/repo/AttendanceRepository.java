package com.school.portal.repo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.school.portal.domain.Attendance;
import com.school.portal.domain.User;

public interface AttendanceRepository extends JpaRepository<Attendance, Long>, JpaSpecificationExecutor<Attendance> {
    boolean existsByUserAndAttendanceDate(User user, LocalDate now);

    Optional<Attendance> findByUser_UserUuidAndAttendanceDate(String userUuid, LocalDate date);

    @Query("SELECT a FROM Attendance a WHERE a.user.userUuid = :userUuid " +
            "AND a.attendanceDate >= :startDate AND a.attendanceDate <= :endDate " +
            "ORDER BY a.attendanceDate ASC")
    List<Attendance> findByUserIdAndDateRange(@Param("userUuid") String  userUuid,
                                              @Param("startDate") LocalDate startDate,
                                              @Param("endDate") LocalDate endDate);
}