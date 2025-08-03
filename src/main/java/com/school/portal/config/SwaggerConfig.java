package com.school.portal.config;

import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig {

	private static final String AUTH_HEADER = "Authorization";
	private static final String AUTH_TYPE = "Bearer";

	@Bean
	public Docket api() {
	    return new Docket(DocumentationType.SWAGGER_2)
	            .apiInfo(apiInfo())
	            .select()
	            .apis(RequestHandlerSelectors.basePackage("com.school.portal.controller"))
	            .paths(PathSelectors.any())
	            .build()
	            .securitySchemes(Collections.singletonList(apiKey()))
	            .securityContexts(Collections.singletonList(securityContext()));
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title("School Portal API")
				.description("API documentation with JWT auth and user_academic_year header")
				.version("1.0")
				.build();
	}

	private ApiKey apiKey() {
		return new ApiKey(AUTH_TYPE, AUTH_HEADER, "header");
	}

	private SecurityContext securityContext() {
		return SecurityContext.builder()
				.securityReferences(defaultAuth())
				.forPaths(PathSelectors.any())
				.build();
	}

	private List<SecurityReference> defaultAuth() {
		AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
		return Collections.singletonList(new SecurityReference(AUTH_TYPE, new AuthorizationScope[]{authorizationScope}));
	}
}
