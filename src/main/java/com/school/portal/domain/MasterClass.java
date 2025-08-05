package com.school.portal.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.school.portal.enums.AcademicYear;

@Entity
public class MasterClass implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5348951937623306641L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long masterClassId;
	
	@Column(name = "master_class_uuid", nullable = false, unique = true, length = 191)
	private String masterClassUuid;
	
	@Column(nullable = false, unique = true)
	private String className;
	
    @Column(name = "academic_year", nullable = false)
    @Enumerated(EnumType.STRING)
    private AcademicYear academicYear;
	
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

	/**
	 * @return the academicYear
	 */
	public AcademicYear getAcademicYear() {
		return academicYear;
	}

	/**
	 * @param academicYear the academicYear to set
	 */
	public void setAcademicYear(AcademicYear academicYear) {
		this.academicYear = academicYear;
	}
	
}
