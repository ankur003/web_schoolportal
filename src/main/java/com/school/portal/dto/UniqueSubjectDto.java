package com.school.portal.dto;
public class UniqueSubjectDto {
    private String subjectName;
    private String description;
    private Integer subjectId;
    private String subjectCode;

    public UniqueSubjectDto(String subjectName, String description, Integer subjectId, String subjectCode) {
        this.subjectName = subjectName;
        this.description = description;
        this.subjectId = subjectId;
        this.subjectCode = subjectCode;
    }

    // Getters & Setters
    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getDescription() {
        return description;
    }

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

	/**
	 * @return the subjectCode
	 */
	public String getSubjectCode() {
		return subjectCode;
	}

	/**
	 * @param subjectCode the subjectCode to set
	 */
	public void setSubjectCode(String subjectCode) {
		this.subjectCode = subjectCode;
	}
	
    
}
