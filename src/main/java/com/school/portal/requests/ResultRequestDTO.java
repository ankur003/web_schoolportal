package com.school.portal.requests;

import com.school.portal.enums.ExamType;

public class ResultRequestDTO {
    private String userUuid;
    private Integer subjectId;
    private Integer marksObtained;
    private String grade;
    private String remarks;
    private ExamType examType;
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
	 * @return the subjectId
	 */
	public Integer getSubjectId() {
		return subjectId;
	}
	/**
	 * @param subjectId the subjectId to set
	 */
	public void setSubjectId(Integer subjectId) {
		this.subjectId = subjectId;
	}
	/**
	 * @return the marksObtained
	 */
	public Integer getMarksObtained() {
		return marksObtained;
	}
	/**
	 * @param marksObtained the marksObtained to set
	 */
	public void setMarksObtained(Integer marksObtained) {
		this.marksObtained = marksObtained;
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
	 * @return the remarks
	 */
	public String getRemarks() {
		return remarks;
	}
	/**
	 * @param remarks the remarks to set
	 */
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	/**
	 * @return the examType
	 */
	public ExamType getExamType() {
		return examType;
	}
	/**
	 * @param examType the examType to set
	 */
	public void setExamType(ExamType examType) {
		this.examType = examType;
	}

}
