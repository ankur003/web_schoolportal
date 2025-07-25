package com.school.portal.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school.portal.domain.Holidays;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface HolidaysRepo extends JpaRepository<Holidays, Long> {

	Holidays findByHolidayDate(String holidayDate);

	Holidays findByHolidayUuid(String holidayUuid);

	@Query("SELECT h FROM Holidays h WHERE STR_TO_DATE(h.holidayDate, '%Y-%m-%d') BETWEEN :startDate AND :endDate")
	List<Holidays> findByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
	
}