package com.school.portal.repo;

import com.school.portal.domain.Attendance;
import com.school.portal.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long>, JpaSpecificationExecutor<Attendance> {
    boolean existsByUserAndAttendanceDate(User user, LocalDate now);

    Optional<Attendance> findByUser_UserUuidAndAttendanceDate(String userUuid, LocalDate date);
}