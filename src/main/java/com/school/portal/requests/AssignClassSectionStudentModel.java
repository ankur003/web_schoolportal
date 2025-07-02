package com.school.portal.requests;

import javax.validation.constraints.NotBlank;

public class AssignClassSectionStudentModel {
	
	@NotBlank(message = "classUuid can not be blank")
	private String classUuid;
	
	//@NotBlank(message = "sectionUuid can not be blank")
	private String sectionUuid;

	public String getClassUuid() {
		return classUuid;
	}

	public void setClassUuid(String classUuid) {
		this.classUuid = classUuid;
	}

	public String getSectionUuid() {
		return sectionUuid;
	}

	public void setSectionUuid(String sectionUuid) {
		this.sectionUuid = sectionUuid;
	}
	
	
	
}
