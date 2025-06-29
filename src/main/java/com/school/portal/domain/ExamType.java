package com.school.portal.domain;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "exam_types")
public class ExamType {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exam_type_id")
    private Integer examTypeId;
    
    @Column(name = "exam_type", nullable = false, length = 50)
    private String examType;
    
    @Column(name = "weightage", precision = 5, scale = 2)
    private BigDecimal weightage = new BigDecimal("100.00");
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "examType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Marks> marks = new HashSet<>();
    
    @Column(name = "is_active")
    private Boolean isActive = false;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Constructors
    public ExamType() {}
    
    public ExamType(String examType, BigDecimal weightage) {
        this.examType = examType;
        this.weightage = weightage;
    }
    
    // Getters and Setters
    public Integer getExamTypeId() { return examTypeId; }
    public void setExamTypeId(Integer examTypeId) { this.examTypeId = examTypeId; }
    
    public String getExamType() { return examType; }
    public void setExamType(String examType) { this.examType = examType; }
    
    public BigDecimal getWeightage() { return weightage; }
    public void setWeightage(BigDecimal weightage) { this.weightage = weightage; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public Set<Marks> getMarks() { return marks; }
    public void setMarks(Set<Marks> marks) { this.marks = marks; }

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
    
    
}