package com.school.portal.service;

import java.util.List;

import com.school.portal.domain.Holidays;
import com.school.portal.requests.HolidaysRequestModel;

public interface HolidayService {

	void saveHolidays(HolidaysRequestModel holiday);

	List<Holidays> getHolidays();

	Holidays getHoliday(String date);

	Holidays getHolidayDetails(String holidayUuid);

	void updateHolidayDetails(Holidays existedHoliday, Holidays holiday);

	void deleteHolidayDetails(Holidays holiday);

}
