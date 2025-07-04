package com.school.portal.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceMonthlyReportResponse {
    private String userUuid;
    private String userName;
    private int year;
    private int month;
    private String monthName;
    private int totalWorkingDays;
    private int totalDaysInMonth;
    private AttendanceSummaryModel summary;
    private List<AttendanceCalendarModel> calendar;
}
