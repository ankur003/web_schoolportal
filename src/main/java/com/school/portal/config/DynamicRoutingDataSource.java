package com.school.portal.config;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import com.school.portal.utils.TenantContext;

public class DynamicRoutingDataSource extends AbstractRoutingDataSource {

    @Override
    protected Object determineCurrentLookupKey() {
        // First try to get from TenantContext (for JWT-based routing)
        String schoolCode = TenantContext.getCurrentSchoolCode();
        if (schoolCode != null) {
            return schoolCode;
        }
        
        // Fallback to header-based routing (for login)
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            String headerValue = attributes.getRequest().getHeader("schoolCode");
            if (headerValue != null) {
                return headerValue;
            }
        }
        
        // Default fallback
        return "CODE_101";
    }
}
