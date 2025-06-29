package com.school.portal.domain;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "class_subjects",
       uniqueConstraints = @UniqueConstraint(
           name = "unique_class_subject_year",
           columnNames = {"master_class_id", "subject_id", "academic_year"}
       ))
public class ClassSubject {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_subject_id")
    private Integer classSubjectId;
    
    @Column(name = "master_class_id", nullable = false)
    private Integer masterClassId;
    
    @Column(name = "master_section_id")
    private Integer masterSectionId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false, foreignKey = @ForeignKey(name = "fk_class_subject_subject"))
    private Subject subject;
    
    @Column(name = "academic_year", nullable = false, length = 10)
    private String academicYear;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Constructors
    public ClassSubject() {}
    
    public ClassSubject(Integer classId, Subject subject, String academicYear) {
        this.masterClassId = classId;
        this.subject = subject;
        this.academicYear = academicYear;
    }
    
    // Getters and Setters
    public Integer getClassSubjectId() { return classSubjectId; }
    public void setClassSubjectId(Integer classSubjectId) { this.classSubjectId = classSubjectId; }
    
    
    public Integer getMasterClassId() {
		return masterClassId;
	}

	public void setMasterClassId(Integer masterClassId) {
		this.masterClassId = masterClassId;
	}

	public Integer getMasterSectionId() {
		return masterSectionId;
	}

	public void setMasterSectionId(Integer masterSectionId) {
		this.masterSectionId = masterSectionId;
	}

	public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }
    
    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    
}