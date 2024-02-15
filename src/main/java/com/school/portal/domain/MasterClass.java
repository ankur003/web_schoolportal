package com.school.portal.domain;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class MasterClass {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long masterClassId;
	
	@Column(nullable = false, unique = true)
	private String masterClassUuid;
	
	@Column(nullable = false, unique = true)
	private String className;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinTable(name = "CLASS_SECTIONS", joinColumns = { @JoinColumn(name = "MASTER_CLASS_ID") }, inverseJoinColumns = {
			@JoinColumn(name = "MASTER_SECTION_ID") })
	private Set<MasterSection> masterSection = new HashSet<>();
	
	private Boolean isActive = true;
	
	private String createdBy;
	
	private LocalDateTime createdAt;
	
	private LocalDateTime updatedAt;

	public Long getMasterClassId() {
		return masterClassId;
	}

	public void setMasterClassId(Long masterClassId) {
		this.masterClassId = masterClassId;
	}

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

	public Set<MasterSection> getMasterSection() {
		return masterSection;
	}

	public void setMasterSection(Set<MasterSection> masterSection) {
		this.masterSection = masterSection;
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
