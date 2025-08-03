package com.school.portal.utils;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.security.core.context.SecurityContextHolder;

import com.school.portal.enums.AcademicYear;
import com.school.portal.service.CustomUserDetails;

public class LoggedInUserUtil {
	
	private static ConcurrentHashMap<String, AcademicYear> academicMap = new ConcurrentHashMap<>();
	
	private LoggedInUserUtil() {
		//
	}

	public static String getLoggedInUserName() {
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}
	
	public static AcademicYear getLoginUserAcadmicYear() {
		String userUuid = ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails()).getUserUuid();
		return academicMap.get(userUuid);
	}

	public static void setLoginUserAcadmicYear(String userName, AcademicYear academicYear) {
		academicMap.put(userName, academicYear);
	}
	
}
