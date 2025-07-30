package com.school.portal.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.school.portal.domain.Address;
import com.school.portal.domain.UserEducation;
import com.school.portal.domain.UserExperience;
import com.school.portal.domain.UserInfo;
import com.school.portal.enums.AcademicYear;

public class UserResponseModel {
	
	private Long userId;
	
	private String userUuid;

	private String username;
	
	private String className;
	
	private String sectionName;
	
	private String fullName;
	
	private Long phoneNo;

	private String userType;

	private LocalDate dob;

	private LocalDate doj;

	private Boolean isAdmin = false;
	
	private Boolean isSuperAdmin = false;
	
	private Boolean isClassTeacher = false; 

	private Boolean isActive = false;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime createdAt;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime updatedAt;

	private String createdBy;
	
	private Address address;
	
	private List<UserEducation> userEducations;
	
	private List<UserExperience> userExperiences;
	
	private UserInfo userInfo;
	
	private long rollNumber;
	
	private String enrollmentNumber;
	
	private String masterClassUuid;
	
	private String masterSectionUuid;
	
	private AcademicYear academicYear;
	
	public UserResponseModel() {
		
	}
	
	public UserResponseModel(
		    Long userId,
		    String userUuid,
		    String username,
		    String className,
		    String sectionName,
		    String fullName,
		    Long phoneNo,
		    String userType,
		    LocalDate dob,
		    LocalDate doj,
		    Boolean isAdmin,
		    Boolean isSuperAdmin,
		    Boolean isClassTeacher,
		    Boolean isActive,
		    LocalDateTime createdAt,
		    LocalDateTime updatedAt,
		    String createdBy,
		    long rollNumber,
		    String enrollmentNumber,
		    String masterClassUuid,
		    String masterSectionUuid,
		    AcademicYear academicYear
		) {
		    this.userId = userId;
		    this.userUuid = userUuid;
		    this.username = username;
		    this.className = className;
		    this.sectionName = sectionName;
		    this.fullName = fullName;
		    this.phoneNo = phoneNo;
		    this.userType = userType;
		    this.dob = dob;
		    this.doj = doj;
		    this.isAdmin = isAdmin;
		    this.isSuperAdmin = isSuperAdmin;
		    this.isClassTeacher = isClassTeacher;
		    this.isActive = isActive;
		    this.createdAt = createdAt;
		    this.updatedAt = updatedAt;
		    this.createdBy = createdBy;
		    this.rollNumber = rollNumber;
		    this.enrollmentNumber = enrollmentNumber;
		    this.masterClassUuid = masterClassUuid;
		    this.masterSectionUuid = masterSectionUuid;
		    this.academicYear = academicYear;
		}

	
	public String getUserUuid() {
		return userUuid;
	}

	public void setUserUuid(String userUuid) {
		this.userUuid = userUuid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

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

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
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

	public Boolean getIsSuperAdmin() {
		return isSuperAdmin;
	}

	public void setIsSuperAdmin(Boolean isSuperAdmin) {
		this.isSuperAdmin = isSuperAdmin;
	}

	public Boolean getIsClassTeacher() {
		return isClassTeacher;
	}

	public void setIsClassTeacher(Boolean isClassTeacher) {
		this.isClassTeacher = isClassTeacher;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
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

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getSectionName() {
		return sectionName;
	}

	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
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

	public List<UserExperience> getUserExperiences() {
		return userExperiences;
	}

	public void setUserExperiences(List<UserExperience> userExperiences) {
		this.userExperiences = userExperiences;
	}

	public UserInfo getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(UserInfo userInfo) {
		this.userInfo = userInfo;
	}

	/**
	 * @return the rollNumber
	 */
	public long getRollNumber() {
		return rollNumber;
	}

	/**
	 * @param rollNumber the rollNumber to set
	 */
	public void setRollNumber(long rollNumber) {
		this.rollNumber = rollNumber;
	}

	/**
	 * @return the enrollmentNumber
	 */
	public String getEnrollmentNumber() {
		return enrollmentNumber;
	}

	/**
	 * @param enrollmentNumber the enrollmentNumber to set
	 */
	public void setEnrollmentNumber(String enrollmentNumber) {
		this.enrollmentNumber = enrollmentNumber;
	}

	/**
	 * @return the masterClassUuid
	 */
	public String getMasterClassUuid() {
		return masterClassUuid;
	}

	/**
	 * @param masterClassUuid the masterClassUuid to set
	 */
	public void setMasterClassUuid(String masterClassUuid) {
		this.masterClassUuid = masterClassUuid;
	}

	/**
	 * @return the masterSectionUuid
	 */
	public String getMasterSectionUuid() {
		return masterSectionUuid;
	}

	/**
	 * @param masterSectionUuid the masterSectionUuid to set
	 */
	public void setMasterSectionUuid(String masterSectionUuid) {
		this.masterSectionUuid = masterSectionUuid;
	}

	/**
	 * @return the userId
	 */
	public Long getUserId() {
		return userId;
	}

	/**
	 * @param userId the userId to set
	 */
	public void setUserId(Long userId) {
		this.userId = userId;
	}

	/**
	 * @return the academicYear
	 */
	public AcademicYear getAcademicYear() {
		return academicYear;
	}

	/**
	 * @param academicYear the academicYear to set
	 */
	public void setAcademicYear(AcademicYear academicYear) {
		this.academicYear = academicYear;
	}
	
	
	
}
