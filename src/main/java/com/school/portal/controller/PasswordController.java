package com.school.portal.controller;

import javax.validation.Valid;

import org.apache.commons.lang3.BooleanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school.portal.AbstractController;
import com.school.portal.domain.Otp;
import com.school.portal.domain.User;
import com.school.portal.requests.ChangePasswordModel;
import com.school.portal.requests.ForgotPasswordModel;
import com.school.portal.requests.ResetPasswordModel;
import com.school.portal.service.OtpService;
import com.school.portal.service.UserService;

import io.swagger.annotations.Api;

@Api
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/password")
public class PasswordController extends AbstractController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private OtpService otpService;
	
	@PostMapping(value = "/forgot")
	public ResponseEntity<Object> forgotPassword(@Valid @RequestBody ForgotPasswordModel forgotPasswordModel) {
		User user = userService.checkUser(forgotPasswordModel.getUsername());
		if (user == null) {
			return ResponseEntity.ok().build();
		}
		otpService.sendForgotPasswordOtp(user);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping(value = "/reset")
	public ResponseEntity<Object> resetPassword(@Valid @RequestBody ResetPasswordModel resetPasswordModel) {
		User user = userService.checkUser(resetPasswordModel.getUsername());
		if (user == null) {
			return ResponseEntity.badRequest().build();
		}
		Otp otp = otpService.checkOtp(user, resetPasswordModel);
		if (otp == null) {
			return ResponseEntity.badRequest().build();
		}
		userService.resetPassword(user, otp, resetPasswordModel.getNewPassword());
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@PutMapping(value = "/change")
	public ResponseEntity<Object> resetPassword(@Valid @RequestBody ChangePasswordModel changePasswordModel) {
		User user = userService.checkUser(authenticationFacade.getAuthentication().getName());
		if (user == null) {
			return ResponseEntity.badRequest().build();
		}
		Boolean isChanged = userService.changePassword(user, changePasswordModel);
		if (BooleanUtils.isFalse(isChanged)) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok().build();
	}

}
