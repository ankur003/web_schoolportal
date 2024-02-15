package com.school.portal.requests;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;

public class ChangePasswordModel {

	@NotBlank(message = "oldPassword can not be blank")
    private String oldPassword;
	
	@NotBlank(message = "newPassword can not be blank")
	private String newPassword;
	
	@NotBlank(message = "confirmNewPassword can not be blank")
	private String confirmNewPassword;

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getConfirmNewPassword() {
		return confirmNewPassword;
	}

	public void setConfirmNewPassword(String confirmNewPassword) {
		this.confirmNewPassword = confirmNewPassword;
	}
	
	@AssertTrue(message = "New password and confirm password must match")
	private boolean isPasswordsMatch() {
		return newPassword != null && confirmNewPassword != null && newPassword.equals(confirmNewPassword);
	}

}