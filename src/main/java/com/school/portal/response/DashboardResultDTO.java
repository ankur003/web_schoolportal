package com.school.portal.response;

import com.school.portal.enums.ExamType;

public class DashboardResultDTO {
    private String userFullName;
    private long rollNumber;
    private String className;
    private String masterClassUuid;
    private String sectionName;
    private String masterSectionUuid;
    private String subjectName;
    private Integer obtainedMarks;
    private Integer totalMarks;
    private Double percentage;
    private String grade;
    private String type; // GAINER or LOOSER
    private String userUuid;
    private String examType;
    

    public DashboardResultDTO(String userFullName, long rollNumber, String className,
                            String masterClassUuid, String sectionName, String masterSectionUuid,
                            String subjectName, Integer obtainedMarks, Integer totalMarks,
                            Double percentage, String grade, String type, String userUuid, ExamType examType) {
        this.userFullName = userFullName;
        this.rollNumber = rollNumber;
        this.className = className;
        this.masterClassUuid = masterClassUuid;
        this.sectionName = sectionName;
        this.masterSectionUuid = masterSectionUuid;
        this.subjectName = subjectName;
        this.obtainedMarks = obtainedMarks;
        this.totalMarks = totalMarks;
        this.percentage = percentage;
        this.grade = grade;
        this.type = type;
        this.userUuid= userUuid;
        this.examType = examType == null ? null : examType.name();
    }

	/**
	 * @return the userFullName
	 */
	public String getUserFullName() {
		return userFullName;
	}

	/**
	 * @param userFullName the userFullName to set
	 */
	public void setUserFullName(String userFullName) {
		this.userFullName = userFullName;
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
	 * @return the className
	 */
	public String getClassName() {
		return className;
	}

	/**
	 * @param className the className to set
	 */
	public void setClassName(String className) {
		this.className = className;
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
	 * @return the sectionName
	 */
	public String getSectionName() {
		return sectionName;
	}

	/**
	 * @param sectionName the sectionName to set
	 */
	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
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
	 * @return the subjectName
	 */
	public String getSubjectName() {
		return subjectName;
	}

	/**
	 * @param subjectName the subjectName to set
	 */
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

	/**
	 * @return the obtainedMarks
	 */
	public Integer getObtainedMarks() {
		return obtainedMarks;
	}

	/**
	 * @param obtainedMarks the obtainedMarks to set
	 */
	public void setObtainedMarks(Integer obtainedMarks) {
		this.obtainedMarks = obtainedMarks;
	}

	/**
	 * @return the totalMarks
	 */
	public Integer getTotalMarks() {
		return totalMarks;
	}

	/**
	 * @param totalMarks the totalMarks to set
	 */
	public void setTotalMarks(Integer totalMarks) {
		this.totalMarks = totalMarks;
	}

	/**
	 * @return the percentage
	 */
	public Double getPercentage() {
		return percentage;
	}

	/**
	 * @param percentage the percentage to set
	 */
	public void setPercentage(Double percentage) {
		this.percentage = percentage;
	}

	/**
	 * @return the grade
	 */
	public String getGrade() {
		return grade;
	}

	/**
	 * @param grade the grade to set
	 */
	public void setGrade(String grade) {
		this.grade = grade;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the userUuid
	 */
	public String getUserUuid() {
		return userUuid;
	}

	/**
	 * @param userUuid the userUuid to set
	 */
	public void setUserUuid(String userUuid) {
		this.userUuid = userUuid;
	}

	/**
	 * @return the examType
	 */
	public String getExamType() {
		return examType;
	}

	/**
	 * @param examType the examType to set
	 */
	public void setExamType(String examType) {
		this.examType = examType;
	}
	

}

