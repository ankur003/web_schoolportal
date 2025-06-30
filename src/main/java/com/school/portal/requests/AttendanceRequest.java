package com.school.portal.requests;

import com.school.portal.enums.ApprovalStatus;
import com.school.portal.enums.AttendanceStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class AttendanceRequest {
    private String userUuid;
    private ApprovalStatus status;
    private LocalDate date;

}
