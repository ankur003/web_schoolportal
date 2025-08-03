package com.school.portal.requests;

import lombok.*;

import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LinkClassSectionModel {
	
	@NotBlank(message = "classUuids can not be blank")
	private String classUuid;
	
	@NotEmpty(message =  "sectionUuids can not be empty")
	private Set<String> sectionUuids;
	
}
