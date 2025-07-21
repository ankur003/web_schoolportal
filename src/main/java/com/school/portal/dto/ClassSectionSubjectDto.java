package com.school.portal.dto;

import java.util.List;

public class ClassSectionSubjectDto {
	
    private String masterClassUuid;
    private String className;
    
    private List<SubjectDto> subjects;
    private List<SectionSubjectDto> sectionSubjects;
	/**
	 * @return the masterClassUuid
	 */
	public String getMasterClassUuid() {
		return masterClassUuid;
	}
	/**
	 * @param masterClassUuid the masterClassUuid to set
	 */
	public void setMasterClassUuid(String masterClassUuid) {
		this.masterClassUuid = masterClassUuid;
	}
	/**
	 * @return the className
	 */
	public String getClassName() {
		return className;
	}
	/**
	 * @param className the className to set
	 */
	public void setClassName(String className) {
		this.className = className;
	}
	/**
	 * @return the subjects
	 */
	public List<SubjectDto> getSubjects() {
		return subjects;
	}
	/**
	 * @param subjects the subjects to set
	 */
	public void setSubjects(List<SubjectDto> subjects) {
		this.subjects = subjects;
	}
	/**
	 * @return the sectionSubjects
	 */
	public List<SectionSubjectDto> getSectionSubjects() {
		return sectionSubjects;
	}
	/**
	 * @param sectionSubjects the sectionSubjects to set
	 */
	public void setSectionSubjects(List<SectionSubjectDto> sectionSubjects) {
		this.sectionSubjects = sectionSubjects;
	}
    
    

}
