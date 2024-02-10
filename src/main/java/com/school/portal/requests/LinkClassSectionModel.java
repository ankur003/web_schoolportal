package com.school.portal.requests;

import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

public class LinkClassSectionModel {
	
	@NotBlank(message = "classUuids can not be blank")
	private String classUuid;
	
	@NotEmpty(message =  "sectionUuids can not be empty")
	private Set<String> sectionUuids;

	public String getClassUuid() {
		return classUuid;
	}

	public void setClassUuid(String classUuid) {
		this.classUuid = classUuid;
	}

	public Set<String> getSectionUuids() {
		return sectionUuids;
	}

	public void setSectionUuids(Set<String> sectionUuids) {
		this.sectionUuids = sectionUuids;
	}
	
}
