package com.school.portal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@ConfigurationProperties(prefix = "school")
public class SchoolProperties {
    
    private Map<String, SchoolDetail> codes;
    
    public Map<String, SchoolDetail> getCodes() {
        return codes;
    }
    
    public void setCodes(Map<String, SchoolDetail> codes) {
        this.codes = codes;
    }
    
    public SchoolDetail getSchoolDetail(String code) {
        return codes.get(code);
    }
    
    public static class SchoolDetail {
        private String databaseUrl;
        private String schoolName;
        private String username;
        private String password;
        
        // Getters and Setters
        public String getDatabaseUrl() { return databaseUrl; }
        public void setDatabaseUrl(String databaseUrl) { this.databaseUrl = databaseUrl; }
        
        public String getSchoolName() { return schoolName; }
        public void setSchoolName(String schoolName) { this.schoolName = schoolName; }
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
