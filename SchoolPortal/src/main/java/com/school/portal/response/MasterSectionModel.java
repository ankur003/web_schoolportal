package com.school.portal.response;
public class MasterSectionModel {
	
	private String masterSectionUuid;
	
	private String sectionName;
	
	private Boolean isActive;

	public String getMasterSectionUuid() {
		return masterSectionUuid;
	}

	public void setMasterSectionUuid(String masterSectionUuid) {
		this.masterSectionUuid = masterSectionUuid;
	}

	public String getSectionName() {
		return sectionName;
	}

	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

}