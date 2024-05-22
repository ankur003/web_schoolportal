package com.school.portal.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school.portal.domain.Holidays;

public interface HolidaysRepo extends JpaRepository<Holidays, Long> {

	Holidays findByHolidayDate(String holidayDate);

	Holidays findByHolidayUuid(String holidayUuid); 
	
	
}