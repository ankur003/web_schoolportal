package com.school.portal.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MasterSection {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long masterSectionId;
	
	@Column(nullable = false, unique = true)
	private String masterSectionUuid;
	
	@Column(nullable = false, unique = true)
	private String sectionName;
	
	private Boolean isActive = true;
	
	public Long getMasterSectionId() {
		return masterSectionId;
	}

	public void setMasterSectionId(Long masterSectionId) {
		this.masterSectionId = masterSectionId;
	}

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
