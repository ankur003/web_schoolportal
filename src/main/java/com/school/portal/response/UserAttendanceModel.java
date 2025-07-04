package com.school.portal.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.school.portal.enums.ApprovalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
public class UserAttendanceModel {
    private UserResponseModel user;
    private ApprovalStatus status;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String category;
}
