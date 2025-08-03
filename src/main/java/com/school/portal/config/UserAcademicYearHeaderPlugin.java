package com.school.portal.config;

import org.springframework.stereotype.Component;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.OperationBuilderPlugin;
import springfox.documentation.spi.service.contexts.OperationContext;

import java.util.Collections;

@Component
public class UserAcademicYearHeaderPlugin implements OperationBuilderPlugin {

    @Override
    public void apply(OperationContext context) {
        // Add header only for GET methods
        if ("GET".equalsIgnoreCase(context.httpMethod().name())) {
            context.operationBuilder().parameters(
                    Collections.singletonList(new ParameterBuilder()
                            .name("user_academic_year")
                            .description("Academic year of the user")
                            .modelRef(new ModelRef("string"))
                            .parameterType("header")
                            .required(true) // set false if optional
                            .build())
            );
        }
    }

    @Override
    public boolean supports(DocumentationType documentationType) {
        return DocumentationType.SWAGGER_2.equals(documentationType);
    }
}
