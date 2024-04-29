package com.school.portal.requests;

import java.time.LocalDate;
import java.util.List;

import com.school.portal.domain.Address;
import com.school.portal.domain.UserEducation;

public class UpdateUserModel {

	private String fullName;

	private Long phoneNo;

	private LocalDate dob;

	private LocalDate doj;

	private Boolean isActive;

	private Address address;

	private List<UserEducation> userEducations;
	
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
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

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public List<UserEducation> getUserEducations() {
		return userEducations;
	}

	public void setUserEducations(List<UserEducation> userEducations) {
		this.userEducations = userEducations;
	}

}
