package com.school.portal.requests;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.Set;

@Getter
@Setter
public class CreateMasterClassModel { 

	@NotBlank(message = "className can not be blank")
	private String className;

	private Set<String> sectionUuids;

}