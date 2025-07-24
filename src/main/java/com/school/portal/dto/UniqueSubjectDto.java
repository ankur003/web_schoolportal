package com.school.portal.dto;
public class UniqueSubjectDto {
    private String subjectName;
    private String description;
    private Integer subjectId;

    public UniqueSubjectDto(String subjectName, String description, Integer subjectId) {
        this.subjectName = subjectName;
        this.description = description;
        this.subjectId = subjectId;
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
    
}
