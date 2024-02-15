package com.school.portal.requests;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import static com.school.portal.constants.ApplicationConstants.ERROR_MSG_SUFFIX;

public class ForgotPasswordModel {

	@NotBlank(message = "username : User Name" + ERROR_MSG_SUFFIX)
    @Size(min = 4, message = "User Name must be at least 4 characters long")
    private String username;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
}