package com.school.portal.utils;

public class TenantContext {
	
	private TenantContext() {
		
	}
	
    private static final ThreadLocal<String> SCHOOL_CODE = new ThreadLocal<>();
    
    public static void setCurrentSchoolCode(String schoolCode) {
        SCHOOL_CODE.set(schoolCode);
    }
    
    public static String getCurrentSchoolCode() {
        return SCHOOL_CODE.get();
    }
    
    public static void clear() {
        SCHOOL_CODE.remove();
    }
    
    
}
