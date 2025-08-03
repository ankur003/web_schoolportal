package com.school.portal.config;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.school.portal.enums.AcademicYear;

import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.AllowableListValues;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.OperationBuilderPlugin;
import springfox.documentation.spi.service.contexts.OperationContext;

@Component
public class UserAcademicYearHeaderPlugin implements OperationBuilderPlugin {

	@Override
	public void apply(OperationContext context) {
		List<String> enumNames = Arrays.stream(AcademicYear.values()).map(Enum::name).collect(Collectors.toList());

		context.operationBuilder()
				.parameters(Collections.singletonList(
						new ParameterBuilder().name("user_academic_year").description("Academic year of the user")
								.modelRef(new ModelRef("string")).parameterType("header").required(true)
								.defaultValue(AcademicYear.YEAR_2025_2026.name()) 
								.allowableValues(new AllowableListValues(enumNames, "string")).build()));
	}

	@Override
	public boolean supports(DocumentationType documentationType) {
		return DocumentationType.SWAGGER_2.equals(documentationType);
	}
}
