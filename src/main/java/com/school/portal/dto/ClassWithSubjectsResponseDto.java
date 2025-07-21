package com.school.portal.dto;

import java.util.List;

public class ClassWithSubjectsResponseDto {
    private String className;
    private String masterClassUuid;
    private List<SubjectResponseDto> subjects;
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
	 * @return the subjects
	 */
	public List<SubjectResponseDto> getSubjects() {
		return subjects;
	}
	/**
	 * @param subjects the subjects to set
	 */
	public void setSubjects(List<SubjectResponseDto> subjects) {
		this.subjects = subjects;
	}
    
    
}