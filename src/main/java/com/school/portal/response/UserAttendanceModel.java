package com.school.portal.response;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.school.portal.enums.ApprovalStatus;
import com.school.portal.enums.AttendanceStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserAttendanceModel {
    private UserResponseModel user;
    private ApprovalStatus approvalStatus;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String category;
    private AttendanceStatus attendanceStatus;
}
