package com.school.portal.dto;
public class UniqueSubjectDto {
    private String subjectName;
    private String description;

    public UniqueSubjectDto(String subjectName, String description) {
        this.subjectName = subjectName;
        this.description = description;
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
}
