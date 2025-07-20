package com.school.portal.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

// Request DTO for creating/updating subjects
public class SubjectRequestDto {
    
    @NotBlank(message = "Subject name is required")
    @Size(max = 191, message = "Subject name cannot exceed 191 characters")
    private String subjectName;
    
    private Integer subjectId;
    
    private String description;
    
    private Integer maxMarks = 100;
    
    private Integer passMarks = 33;

	/**
	 * @return the subjectName
	 */
	public String getSubjectName() {
		return subjectName;
	}

	/**
	 * @param subjectName the subjectName to set
	 */
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

	/**
	 * @return the maxMarks
	 */
	public Integer getMaxMarks() {
		return maxMarks;
	}

	/**
	 * @param maxMarks the maxMarks to set
	 */
	public void setMaxMarks(Integer maxMarks) {
		this.maxMarks = maxMarks;
	}

	/**
	 * @return the passMarks
	 */
	public Integer getPassMarks() {
		return passMarks;
	}

	/**
	 * @param passMarks the passMarks to set
	 */
	public void setPassMarks(Integer passMarks) {
		this.passMarks = passMarks;
	}

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
	 * @return the subjectId
	 */
	public Integer getSubjectId() {
		return subjectId;
	}

	/**
	 * @param subjectId the subjectId to set
	 */
	public void setSubjectId(Integer subjectId) {
		this.subjectId = subjectId;
	}
	
	
	
    
}

// Response DTO
