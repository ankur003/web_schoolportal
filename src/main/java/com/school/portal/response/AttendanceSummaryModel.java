package com.school.portal.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceSummaryModel {
    private int presentDays;
    private int absentDays;
    private int lateDays;
    private int halfDays;
    private int sickLeaveDays;
    private int casualLeaveDays;
    private double attendancePercentage;
}
