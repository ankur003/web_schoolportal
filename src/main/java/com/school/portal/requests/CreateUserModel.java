package com.school.portal.requests;

import static com.school.portal.constants.ApplicationConstants.ERROR_MSG_SUFFIX;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;

import com.school.portal.enums.UserType;

public class CreateUserModel {

	@NotBlank(message = "User Name" + ERROR_MSG_SUFFIX)
	private String username;

	@NotBlank(message = "First Name" + ERROR_MSG_SUFFIX)
	private String firstName;

	private String middleName;

	private String lastName;

	private Long phoneNo;

	@NotBlank(message = "Password" + ERROR_MSG_SUFFIX)
	private String password;

	private LocalDate dob;

	private LocalDate doj;

	private Boolean isAdmin = false;

	private Boolean isClassTeacher = false;
	
	@NotBlank(message = "userType" + ERROR_MSG_SUFFIX)
	private UserType userType;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Long getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(Long phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public Boolean getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(Boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public Boolean getIsClassTeacher() {
		return isClassTeacher;
	}

	public void setIsClassTeacher(Boolean isClassTeacher) {
		this.isClassTeacher = isClassTeacher;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}
	
}
