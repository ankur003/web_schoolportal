package com.school.portal.requests;

import java.util.Set;

public class LinkClassSectionModel {
	
	private String classUuid;
	
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
