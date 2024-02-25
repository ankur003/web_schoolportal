package com.school.portal.requests;

import static com.school.portal.constants.ApplicationConstants.ERROR_MSG_SUFFIX;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.school.portal.enums.UserType;

public class CreateUserModel {

	@NotBlank(message = "User Name" + ERROR_MSG_SUFFIX)
	private String username;

	@NotBlank(message = "Full Name" + ERROR_MSG_SUFFIX)
	private String fullName;

	private Long phoneNo;

	private LocalDate dob;

	private LocalDate doj;

	@NotNull(message = "userType" + ERROR_MSG_SUFFIX)
	private UserType userType;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Long getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(Long phoneNo) {
		this.phoneNo = phoneNo;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public LocalDate getDoj() {
		return doj;
	}

	public void setDoj(LocalDate doj) {
		this.doj = doj;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	
}
