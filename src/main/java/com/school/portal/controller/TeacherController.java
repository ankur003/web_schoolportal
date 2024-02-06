package com.school.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school.portal.AbstractController;
import com.school.portal.domain.User;
import com.school.portal.response.UserResponseModel;
import com.school.portal.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/t")
public class TeacherController extends AbstractController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("")
	@PreAuthorize("hasRole('TEACHER')")
	public ResponseEntity<Object> getTeacherDetail() {
		User user = userService.getUserDetail(authenticationFacade.getAuthentication().getName());
		UserResponseModel model = modelMapper.map(user, UserResponseModel.class);
		return ResponseEntity.ok(model);
	}

}
