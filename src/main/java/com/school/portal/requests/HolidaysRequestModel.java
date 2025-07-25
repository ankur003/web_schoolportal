package com.school.portal.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class HolidaysRequestModel {
	
	private LocalDate holidayFromDate;
	
	private LocalDate holidayToDate;
	
	private String holidayType;
	
	private String holidayName;
	
	private String holidayRemark;

}
