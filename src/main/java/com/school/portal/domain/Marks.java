package com.school.portal.domain;
import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "marks",
       uniqueConstraints = @UniqueConstraint(
           name = "unique_student_subject_exam",
           columnNames = {"student_id", "subject_id", "exam_type_id", "academic_year"}
       ))
public class Marks {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mark_id")
    private Integer markId;
    
    @Column(name = "student_id", nullable = false)
    private Integer studentId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false, foreignKey = @ForeignKey(name = "fk_marks_subject"))
    private Subject subject;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_type_id", nullable = false, foreignKey = @ForeignKey(name = "fk_marks_exam_type"))
    private ExamType examType;
    
    @Column(name = "marks_obtained", nullable = false, precision = 5, scale = 2)
    @NotNull
    @DecimalMin(value = "0.0", message = "Marks obtained cannot be negative")
    private BigDecimal marksObtained;
    
    @Column(name = "max_marks", nullable = false, precision = 5, scale = 2)
    private BigDecimal maxMarks = new BigDecimal("100.00");
    
    @Column(name = "exam_date", nullable = false)
    @NotNull
    private LocalDate examDate;
    
    @Column(name = "academic_year", nullable = false, length = 10)
    @NotNull
    private String academicYear;
    
    @Column(name = "remarks", columnDefinition = "TEXT")
    private String remarks;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "is_active")
    private Boolean isActive = false;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        validateMarks();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        validateMarks();
    }
    
    private void validateMarks() {
        if (marksObtained != null && maxMarks != null) {
            if (marksObtained.compareTo(BigDecimal.ZERO) < 0 || 
                marksObtained.compareTo(maxMarks) > 0) {
                throw new IllegalArgumentException("Marks obtained must be between 0 and max marks");
            }
        }
    }
    
    // Constructors
    public Marks() {}
    
    public Marks(Integer studentId, Subject subject, ExamType examType, 
                BigDecimal marksObtained, LocalDate examDate, String academicYear) {
        this.studentId = studentId;
        this.subject = subject;
        this.examType = examType;
        this.marksObtained = marksObtained;
        this.examDate = examDate;
        this.academicYear = academicYear;
    }
    
    // Getters and Setters
    public Integer getMarkId() { return markId; }
    public void setMarkId(Integer markId) { this.markId = markId; }
    
    public Integer getStudentId() { return studentId; }
    public void setStudentId(Integer studentId) { this.studentId = studentId; }
    
    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }
    
    public ExamType getExamType() { return examType; }
    public void setExamType(ExamType examType) { this.examType = examType; }
    
    public BigDecimal getMarksObtained() { return marksObtained; }
    public void setMarksObtained(BigDecimal marksObtained) { this.marksObtained = marksObtained; }
    
    public BigDecimal getMaxMarks() { return maxMarks; }
    public void setMaxMarks(BigDecimal maxMarks) { this.maxMarks = maxMarks; }
    
    public LocalDate getExamDate() { return examDate; }
    public void setExamDate(LocalDate examDate) { this.examDate = examDate; }
    
    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }
    
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
    
    
}