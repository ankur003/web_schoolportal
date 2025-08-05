package com.school.portal.dto;

import java.util.List;

import com.school.portal.enums.AcademicYear;

public class SectionSubjectDto {
	
	private String masterSectionUuid;
    private String sectionName;
    
    private List<SubjectDto> subjects;
    
    private AcademicYear academicYear;

	/**
	 * @return the masterSectionUuid
	 */
	public String getMasterSectionUuid() {
		return masterSectionUuid;
	}

	/**
	 * @param masterSectionUuid the masterSectionUuid to set
	 */
	public void setMasterSectionUuid(String masterSectionUuid) {
		this.masterSectionUuid = masterSectionUuid;
	}

	/**
	 * @return the sectionName
	 */
	public String getSectionName() {
		return sectionName;
	}

	/**
	 * @param sectionName the sectionName to set
	 */
	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
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
	 * @return the academicYear
	 */
	public AcademicYear getAcademicYear() {
		return academicYear;
	}

	/**
	 * @param academicYear the academicYear to set
	 */
	public void setAcademicYear(AcademicYear academicYear) {
		this.academicYear = academicYear;
	}
    
    

}
