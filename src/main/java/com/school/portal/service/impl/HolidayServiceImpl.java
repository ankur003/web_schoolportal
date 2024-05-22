package com.school.portal.service.impl;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.portal.domain.Holidays;
import com.school.portal.repo.HolidaysRepo;
import com.school.portal.requests.HolidaysRequestModel;
import com.school.portal.service.HolidayService;
import com.school.portal.utils.SchoolPortalUtils;

@Service
public class HolidayServiceImpl implements HolidayService {
	
	@Autowired
	private HolidaysRepo holidaysRepo;
	
	@Override
	public Holidays getHoliday(String date) {
		return holidaysRepo.findByHolidayDate(date);
	}

	@Override
	public void saveHolidays(HolidaysRequestModel holiday) {
		long holidayCount = holidaysRepo.count();
		if (holidayCount == 0) {
			List<String> holidayList = getSundayAsWeekOfHoliday();
			HolidaysRequestModel requestModel = new HolidaysRequestModel();
			requestModel.setHolidayName("Week Off Holiday");
			requestModel.setHolidayRemark("Remark - Sunday");
			requestModel.setHolidayType("WEEK_OFF");
			createHoliday(holidayList, requestModel);
		}
		List<String> holidayList = getDateRange(holiday.getHolidayFromDate(), holiday.getHolidayToDate());
		if (CollectionUtils.isNotEmpty(holidayList)) {
			createHoliday(holidayList, holiday);
		}
	}
	
	@Override
	public List<Holidays> getHolidays() {
		return holidaysRepo.findAll();
	}

	private void createHoliday(List<String> holidayList, HolidaysRequestModel holidayRequestModel) {
		for (String holidayDate : holidayList) {
			Holidays holiday = holidaysRepo.findByHolidayDate(holidayDate);
			if (holiday == null) {
				holiday = new Holidays();
				holiday.setCreatedAt(LocalDateTime.now());
				holiday.setHolidayUuid(SchoolPortalUtils.getUniqueUuid());
				holiday.setHolidayDate(holidayDate);
				holiday.setUpdatedAt(LocalDateTime.now());
				holiday.setHolidayName(holidayRequestModel.getHolidayName());
				holiday.setHolidayRemark(holidayRequestModel.getHolidayRemark());
				holiday.setHolidayType(holidayRequestModel.getHolidayType());
				holidaysRepo.save(holiday);
			}
		}
		
	}

	private List<String> getSundayAsWeekOfHoliday() {
		List<String> holidayList = new ArrayList<>();
		Month startMonth = Month.APRIL;
		int startYear = 2024;
		Month endMonth = Month.MARCH;
		int endYear = 2025;

		LocalDate startDate = LocalDate.of(startYear, startMonth, 1);
		LocalDate endDate = LocalDate.of(endYear, endMonth, 1).plusMonths(1).minusDays(1); // Last day of end month

		// Loop through the dates and print Sundays
		LocalDate current = startDate;
		while (!current.isAfter(endDate)) {
			if (current.getDayOfWeek() == DayOfWeek.SUNDAY) {
				holidayList.add(current.toString());
			}
			current = current.plusDays(1);
		}
		return holidayList;
	}
	
	 public static List<String> getDateRange(LocalDate fromDate, LocalDate toDate) {
	        List<String> datesInRange = new ArrayList<>();
	        LocalDate current = fromDate;

	        while (!current.isAfter(toDate)) {
	            datesInRange.add(current.toString());
	            current = current.plusDays(1);
	        }

	        return datesInRange;
	    }

	@Override
	public Holidays getHolidayDetails(String holidayUuid) {
		return holidaysRepo.findByHolidayUuid(holidayUuid);
	}

	@Override
	public void updateHolidayDetails(Holidays existedHoliday, Holidays holiday) {
		if (StringUtils.isNotBlank(holiday.getHolidayName())) {
			existedHoliday.setHolidayName(holiday.getHolidayName());
		}
		if (StringUtils.isNotBlank(holiday.getHolidayRemark())) {
			existedHoliday.setHolidayRemark(holiday.getHolidayRemark());
		}
		if (StringUtils.isNotBlank(holiday.getHolidayType())) {
			existedHoliday.setHolidayType(holiday.getHolidayType());
		}
		if (StringUtils.isNotBlank(holiday.getHolidayDate())) {
			Holidays dateHoliday = getHoliday(holiday.getHolidayDate());
			if (dateHoliday == null) {
				existedHoliday.setHolidayDate(holiday.getHolidayDate());
			}
		}
		holidaysRepo.save(existedHoliday);
	}

	@Override
	public void deleteHolidayDetails(Holidays holiday) {
		holidaysRepo.delete(holiday);
	}

}
