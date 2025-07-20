package com.school.portal.requests;

import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ClassSubjectLinkRequestDto {
	
    @NotBlank(message = "Master class UUID is required")
    private String masterClassUuid;

    private String masterSectionUuid;

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
