package com.school.portal.requests;

import java.util.Set;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ClassSubjectLinkRequestDto {
	
    //@NotBlank(message = "Master class UUID is required")
    private String masterClassUuid;
    
    private Set<String> masterSectionUuid;
    
    private String sectionName;

    @NotNull(message = "Subject names cannot be null")
    @Size(min = 1, message = "At least one subject name is required")
    private Set<String> subjectNames;

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
	 * @return the masterSectionUuid
	 */
	public Set<String> getMasterSectionUuid() {
		return masterSectionUuid;
	}

	/**
	 * @param masterSectionUuid the masterSectionUuid to set
	 */
	public void setMasterSectionUuid(Set<String> masterSectionUuid) {
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
	 * @return the subjectNames
	 */
	public Set<String> getSubjectNames() {
		return subjectNames;
	}

	/**
	 * @param subjectNames the subjectNames to set
	 */
	public void setSubjectNames(Set<String> subjectNames) {
		this.subjectNames = subjectNames;
	}
    
    

}
