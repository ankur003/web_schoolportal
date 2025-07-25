package com.school.portal.controller;

import com.school.portal.AbstractController;
import com.school.portal.domain.User;
import com.school.portal.enums.AttendanceStatus;
import com.school.portal.response.UserResponseModel;
import com.school.portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/t")
public class TeacherController extends AbstractController {

    @Autowired
    private UserService userService;

    @GetMapping("")
   // @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<Object> getTeacherDetail() {
        User user = userService.getUserDetail (authenticationFacade.getAuthentication ().getName ());
        UserResponseModel model = modelMapper.map (user, UserResponseModel.class);
        return ResponseEntity.ok (model);
    }

    @PostMapping("/attendance")
    // @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<Object> markTeacherAttendance(@RequestParam(required = false) AttendanceStatus status,
                                                        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                                        @RequestParam(required = true) String catagory) {
    	// catagory == "ATTENDANCE" OR "LEAVE"
    	if (catagory.equals("ATTENDANCE") || catagory.equals("LEAVE")) {
    		 User user = userService.getUserDetail (authenticationFacade.getAuthentication ().getName ());
    	     userService.markAttendance (user, status, date, catagory);
    	     return ResponseEntity.ok ().build ();
    	} 
        return ResponseEntity.badRequest().build();
    }

}
