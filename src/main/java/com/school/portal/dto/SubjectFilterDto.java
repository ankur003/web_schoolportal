package com.school.portal.dto;
public class SubjectFilterDto {
    
    private String classUuid;
    private String sectionUuid;
    private Integer subjectId;
    
    // Constructors
    public SubjectFilterDto() {}
    
    public SubjectFilterDto(String classUuid, String sectionUuid, Integer subjectId) {
        this.classUuid = classUuid;
        this.sectionUuid = sectionUuid;
        this.subjectId = subjectId;
    }
    
    // Getters and Setters
    public String getClassUuid() { return classUuid; }
    public void setClassUuid(String classUuid) { this.classUuid = classUuid; }
    
    public String getSectionUuid() { return sectionUuid; }
    public void setSectionUuid(String sectionUuid) { this.sectionUuid = sectionUuid; }
    
    public Integer getSubjectId() { return subjectId; }
    public void setSubjectId(Integer subjectId) { this.subjectId = subjectId; }
}