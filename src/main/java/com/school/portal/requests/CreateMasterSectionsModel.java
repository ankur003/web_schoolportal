package com.school.portal.requests;

import javax.validation.constraints.NotBlank;

public class CreateMasterSectionsModel {
	
	@NotBlank(message = "sectionName can not be blank")
	private String sectionName;

	public String getSectionName() {
		return sectionName;
	}

	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}
	
}
