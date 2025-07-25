package com.school.portal.response;

import com.school.portal.enums.ApprovalStatus;
import com.school.portal.enums.AttendanceStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceCalendarModel {
    private LocalDate date;
    private AttendanceStatus status;
    private LocalDateTime markedAt;
    private ApprovalStatus approvalStatus;
    private String approvedByName;
    private LocalDateTime approvedAt;
    private String remarks;
    private boolean isWeekend;
    private boolean isHoliday;
    private String holidayName;
    private String holidayType;
}
