package com.school.portal.requests;

import java.time.LocalDate;

public class HolidaysRequestModel {
	
	private LocalDate holidayFromDate;
	
	private LocalDate holidayToDate;
	
	private String holidayType;
	
	private String holidayName;
	
	private String holidayRemark;

	public LocalDate getHolidayFromDate() {
		return holidayFromDate;
	}

	public void setHolidayFromDate(LocalDate holidayFromDate) {
		this.holidayFromDate = holidayFromDate;
	}

	public LocalDate getHolidayToDate() {
		return holidayToDate;
	}

	public void setHolidayToDate(LocalDate holidayToDate) {
		this.holidayToDate = holidayToDate;
	}

	public String getHolidayName() {
		return holidayName;
	}

	public void setHolidayName(String holidayName) {
		this.holidayName = holidayName;
	}

	public String getHolidayRemark() {
		return holidayRemark;
	}

	public void setHolidayRemark(String holidayRemark) {
		this.holidayRemark = holidayRemark;
	}

	public String getHolidayType() {
		return holidayType;
	}

	public void setHolidayType(String holidayType) {
		this.holidayType = holidayType;
	}
	
}
