package com.school.portal.requests;

import javax.validation.constraints.NotBlank;

public class CreateMasterClassModel { 

	@NotBlank(message = "className can not be blank")
	private String className;

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}
	
}