package com.school.portal.service;

import com.school.portal.config.SchoolProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Set;

@Service
public class SchoolCodeService {
    
    @Autowired
    private SchoolProperties schoolProperties;
    
    @PostConstruct
    public void validateSchoolCodes() {
        if (schoolProperties.getCodes() == null || schoolProperties.getCodes().isEmpty()) {
            throw new IllegalStateException("No school codes configured in application.properties");
        }
        
        System.out.println("Loaded school codes: " + schoolProperties.getCodes().keySet());
    }
    
    public boolean isValidSchoolCode(String code) {
        return schoolProperties.getCodes().containsKey(code);
    }
    
    public SchoolProperties.SchoolDetail getSchoolDetail(String code) {
        return schoolProperties.getSchoolDetail(code);
    }
    
    public Set<String> getAllSchoolCodes() {
        return schoolProperties.getCodes().keySet();
    }
}
