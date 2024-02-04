package com.school.portal.response;

import java.util.Set;

public class LinkedMasterClassModel {
	
	private String masterClassUuid;
	
	private String className;
	
	private Boolean isActive;
	
	private Set<MasterSectionModel> masterSection;

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

	public Set<MasterSectionModel> getMasterSection() {
		return masterSection;
	}

	public void setMasterSection(Set<MasterSectionModel> masterSection) {
		this.masterSection = masterSection;
	}
	
	
}