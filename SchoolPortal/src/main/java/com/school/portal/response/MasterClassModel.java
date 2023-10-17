package com.school.portal.response;

public class MasterClassModel {
	
	private String masterClassUuid;
	
	private String className;
	
	private Boolean isActive;

	public String getMasterClassUuid() {
		return masterClassUuid;
	}

	public void setMasterClassUuid(String masterClassUuid) {
		this.masterClassUuid = masterClassUuid;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	
}