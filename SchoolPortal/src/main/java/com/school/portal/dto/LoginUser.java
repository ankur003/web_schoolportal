package com.school.portal.dto;

import javax.validation.constraints.NotBlank;

import static com.school.portal.constants.ApplicationConstants.ERROR_MSG_SUFFIX;

public class LoginUser {

	@NotBlank(message = "username : User Name" + ERROR_MSG_SUFFIX)
    private String username;
	
	@NotBlank(message = "password : Password" + ERROR_MSG_SUFFIX)
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}