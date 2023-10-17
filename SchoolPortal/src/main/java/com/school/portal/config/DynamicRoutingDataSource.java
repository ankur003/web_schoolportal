package com.school.portal.config;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.school.portal.enums.AcademicYear;

public class DynamicRoutingDataSource extends AbstractRoutingDataSource {
    @Override
    protected Object determineCurrentLookupKey() {
    	ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            String headerValue = attributes.getRequest().getHeader("dataSource");
            if (headerValue != null) {
            	return determineDataSourceKey(headerValue);
            }
        }
        return AcademicYear.YEAR_2022_2023.name();
    }
    
    private String determineDataSourceKey(String headerValue) {
        return headerValue;
    }
}
