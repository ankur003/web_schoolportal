package com.school.portal.controller;

import com.school.portal.enums.AttendanceStatus;
import com.school.portal.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/u")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class StudentController {

    private final UserService userService;

    @PostMapping("/attendance")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<Object> markStudentAttendance(@RequestParam(name = "userId") String userUuid,
                                                        @RequestParam AttendanceStatus status, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        userService.markAttendance (userService.getUserDetailByUuid (userUuid), status, date);
        return ResponseEntity.ok().build();
    }
}
