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
    private int totalDays;
    private int presentDays;
    private int absentDays;
    private int lateDays;
    private int halfDays;
    private int sickLeaveDays;
    private int casualLeaveDays;
    private double attendancePercentage;
    private List<AttendanceModel> attendanceRecords;
}
