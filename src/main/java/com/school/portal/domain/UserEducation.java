package com.school.portal.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class UserEducation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
	private Long userEducationId;
	
	@Column(unique = true, nullable = false, updatable = false, length = 191)
	private String userEducationUuid; 

	@JsonIgnore
	private Long userId;
	
	private String schoolName;
	
	private String schoolAddress;
	
	private String passOutYear;
	
	private String lastPassoutClassName;
	
	private String grade;
	
	private String pecentage;
	
	private String createdBy;
	
	private LocalDateTime createdAt;
	
	private LocalDateTime updatedAt;

	public Long getUserEducationId() {
		return userEducationId;
	}

	public void setUserEducationId(Long userEducationId) {
		this.userEducationId = userEducationId;
	}

	public String getUserEducationUuid() {
		return userEducationUuid;
	}

	public void setUserEducationUuid(String userEducationUuid) {
		this.userEducationUuid = userEducationUuid;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public String getSchoolAddress() {
		return schoolAddress;
	}

	public void setSchoolAddress(String schoolAddress) {
		this.schoolAddress = schoolAddress;
	}

	public String getPassOutYear() {
		return passOutYear;
	}

	public void setPassOutYear(String passOutYear) {
		this.passOutYear = passOutYear;
	}

	public String getLastPassoutClassName() {
		return lastPassoutClassName;
	}

	public void setLastPassoutClassName(String lastPassoutClassName) {
		this.lastPassoutClassName = lastPassoutClassName;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getPecentage() {
		return pecentage;
	}

	public void setPecentage(String pecentage) {
		this.pecentage = pecentage;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	
}
