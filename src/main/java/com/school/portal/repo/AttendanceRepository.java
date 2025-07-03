package com.school.portal.repo;

import com.school.portal.domain.Attendance;
import com.school.portal.domain.User;
import com.school.portal.enums.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long>, JpaSpecificationExecutor<Attendance> {
    boolean existsByUserAndStatusAndAttendanceDate(User user, AttendanceStatus status, LocalDate now);

    Optional<Attendance> findByUser_UserUuidAndAttendanceDate(String userUuid, LocalDate date);

    @Query("SELECT a FROM Attendance a WHERE a.user.userUuid = :userUuid " +
            "AND a.attendanceDate >= :startDate AND a.attendanceDate <= :endDate " +
            "ORDER BY a.attendanceDate ASC")
    List<Attendance> findByUserIdAndDateRange(@Param("userUuid") String  userUuid,
                                              @Param("startDate") LocalDate startDate,
                                              @Param("endDate") LocalDate endDate);
}