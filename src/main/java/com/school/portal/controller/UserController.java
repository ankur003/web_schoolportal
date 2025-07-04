package com.school.portal.controller;

import com.school.portal.response.AttendanceMonthlyReportResponse;
import com.school.portal.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
//	@GetMapping("/getString")
//	public String getString() {
//		return "Mr. BANSALA";
//	}

	@GetMapping("/{userId}/monthly-attendance")
	public ResponseEntity<Object> getUserMonthlyAttendance(@PathVariable(name = "userId") String userUuid,
														   @RequestParam @Min(2000) @Max(2100) int year, @RequestParam @Min(1) @Max(12) int month) {
		AttendanceMonthlyReportResponse report = userService.getUserAttendanceForMonth (userUuid, year, month);
		return ResponseEntity.ok (report);

	}

}
