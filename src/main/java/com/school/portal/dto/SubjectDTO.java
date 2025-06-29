package com.school.portal.dto;
import java.time.LocalDateTime;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class SubjectDTO {
    
    private Integer subjectId;
    
    @NotBlank(message = "Subject name is required")
    @Size(max = 100, message = "Subject name cannot exceed 100 characters")
    private String subjectName;
    
    @Size(max = 20, message = "Subject code cannot exceed 20 characters")
    private String subjectCode;
    
    @Min(value = 1, message = "Max marks must be at least 1")
    @Max(value = 1000, message = "Max marks cannot exceed 1000")
    private Integer maxMarks = 100;
    
    @Min(value = 0, message = "Pass marks cannot be negative")
    private Integer passMarks = 35;
    
    private Boolean isActive = true;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public SubjectDTO() {}
    
    public SubjectDTO(String subjectName, String subjectCode) {
        this.subjectName = subjectName;
        this.subjectCode = subjectCode;
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
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}