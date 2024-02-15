package com.school.portal.domain;

import java.time.LocalDateTime;

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
	
	private LocalDateTime createdAt;
	
	private LocalDateTime updatedAt;
	
	private String createdBy;
	
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

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	
}
