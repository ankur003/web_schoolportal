package com.school.portal.controller;

import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school.portal.AbstractController;
import com.school.portal.domain.User;
import com.school.portal.dto.LoginUser;
import com.school.portal.enums.ErrorCode;
import com.school.portal.enums.ResponseCode;
import com.school.portal.service.AuthenticationService;
import com.school.portal.service.UserService;
import com.school.portal.utils.ResponseBuilder;

import io.swagger.annotations.Api;

@Api
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/login")
public class LoginController extends AbstractController {

	@Autowired
	AuthenticationService authenticationService;

	@Autowired
	UserService userService;

	@PostMapping(value = "")
	public ResponseEntity<Object> login(@Valid @RequestBody LoginUser loginUser) {
		User user = userService.checkCredaintials(loginUser);
		String jwtToken = authenticationService.login(loginUser);
		Map<String, Object> map = ResponseBuilder.buildLoginResponse(jwtToken, user);
		return ResponseBuilder.response(HttpStatus.OK, false, "Login Success", ErrorCode.OK, ResponseCode.ACKNOWLEDGE,map);
	}
	
}
