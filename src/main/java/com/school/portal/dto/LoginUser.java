package com.school.portal.dto;

import static com.school.portal.constants.ApplicationConstants.ERROR_MSG_SUFFIX;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class LoginUser {

	@NotBlank(message = "username : User Name" + ERROR_MSG_SUFFIX)
    @Size(min = 4, message = "User Name must be at least 4 characters long")
    private String username;
	
	@NotBlank(message = "password : Password" + ERROR_MSG_SUFFIX) 
    @Size(min = 4, message = "Password must be at least 4 characters long")
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