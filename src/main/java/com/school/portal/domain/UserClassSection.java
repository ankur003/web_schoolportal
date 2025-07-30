package com.school.portal.domain;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.school.portal.enums.AcademicYear;

@Entity
public class UserClassSection implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8807064819894577749L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userClassSectionId;
	
	@Column(name = "user_class_section_uuid", nullable = false, unique = true, length = 191)
	private String userClassSectionUuid; 
	
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
	
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "master_class_id", nullable = false)
    private MasterClass masterClass;
	
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "master_section_id")
    private MasterSection masterSection;
    
	@Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AcademicYear academicYear;
    
    private Boolean isActive = false;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Getters and setters
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

	/**
	 * @return the userClassSectionId
	 */
	public Long getUserClassSectionId() {
		return userClassSectionId;
	}

	/**
	 * @param userClassSectionId the userClassSectionId to set
	 */
	public void setUserClassSectionId(Long userClassSectionId) {
		this.userClassSectionId = userClassSectionId;
	}

	/**
	 * @return the userClassSectionUuid
	 */
	public String getUserClassSectionUuid() {
		return userClassSectionUuid;
	}

	/**
	 * @param userClassSectionUuid the userClassSectionUuid to set
	 */
	public void setUserClassSectionUuid(String userClassSectionUuid) {
		this.userClassSectionUuid = userClassSectionUuid;
	}

	/**
	 * @return the masterClass
	 */
	public MasterClass getMasterClass() {
		return masterClass;
	}

	/**
	 * @param masterClass the masterClass to set
	 */
	public void setMasterClass(MasterClass masterClass) {
		this.masterClass = masterClass;
	}

	/**
	 * @return the masterSection
	 */
	public MasterSection getMasterSection() {
		return masterSection;
	}

	/**
	 * @param masterSection the masterSection to set
	 */
	public void setMasterSection(MasterSection masterSection) {
		this.masterSection = masterSection;
	}

	/**
	 * @return the user
	 */
	public User getUser() {
		return user;
	}

	/**
	 * @param user the user to set
	 */
	public void setUser(User user) {
		this.user = user;
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
	 * @return the createdAt
	 */
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	/**
	 * @param createdAt the createdAt to set
	 */
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	/**
	 * @return the updatedAt
	 */
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	/**
	 * @param updatedAt the updatedAt to set
	 */
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

}