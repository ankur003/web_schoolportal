package com.school.portal.requests;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ResetPasswordModel {
	
	@NotNull(message = "otp cannot be null")
	private Integer otp;
	
	@NotBlank(message = "userName cannot be blank")
	private String username;
	
	@NotBlank(message = "newPassword cannot be blank")
	private String newPassword;
	
	@NotBlank(message = "confirmPassword cannot be blank")
	private String confirmPassword;

	public Integer getOtp() {
		return otp;
	}

	public void setOtp(Integer otp) {
		this.otp = otp;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	
	@AssertTrue(message = "New password and confirm password must match")
	private boolean isPasswordsMatch() {
		return newPassword != null && confirmPassword != null && newPassword.equals(confirmPassword);
	}
	
}
