package com.school.portal.domain;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import com.school.portal.enums.AcademicYear;

@Entity
@Table(name = "subjects")
public class Subject {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id")
    private Integer subjectId;
    
    @Column(name = "subject_name", nullable = false, length = 191)
    private String subjectName;
    
    private String description;
    
    @Column(name = "subject_code", nullable = false, length = 20)
    private String subjectCode;
    
    @Column(name = "master_class_id")
    private Long masterClassId;
    
    @Column(name = "master_section_id")
    private Long masterSectionId;
    
    @Column(name = "max_marks")
    private Integer maxMarks = 100;
    
    @Column(name = "pass_marks")
    private Integer passMarks = 33;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
	@Enumerated(EnumType.STRING)
	private AcademicYear academicYear;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Constructors
    public Subject() {}
    
    public Subject(String subjectName, String subjectCode, Integer subjectId) {
        this.subjectName = subjectName;
        this.subjectCode = subjectCode;
        this.subjectId = subjectId;
    }
    
    // Getters and Setters
    public Integer getSubjectId() { return subjectId; }
    public void setSubjectId(Integer subjectId) { this.subjectId = subjectId; }
    
    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }
    
    public String getSubjectCode() { return subjectCode; }
    public void setSubjectCode(String subjectCode) { this.subjectCode = subjectCode; }
    
    public Integer getMaxMarks() { return maxMarks; }
    public void setMaxMarks(Integer maxMarks) { this.maxMarks = maxMarks; }
    
    public Integer getPassMarks() { return passMarks; }
    public void setPassMarks(Integer passMarks) { this.passMarks = passMarks; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the isActive
	 */
	public Boolean getIsActive() {
		return isActive;
	}

	/**
	 * @param isActive the isActive to set
	 */
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	/**
	 * @return the masterClassId
	 */
	public Long getMasterClassId() {
		return masterClassId;
	}

	/**
	 * @param masterClassId the masterClassId to set
	 */
	public void setMasterClassId(Long masterClassId) {
		this.masterClassId = masterClassId;
	}

	/**
	 * @return the masterSectionId
	 */
	public Long getMasterSectionId() {
		return masterSectionId;
	}

	/**
	 * @param masterSectionId the masterSectionId to set
	 */
	public void setMasterSectionId(Long masterSectionId) {
		this.masterSectionId = masterSectionId;
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
