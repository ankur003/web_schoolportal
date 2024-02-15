package com.school.portal.utils;

import org.springframework.security.core.context.SecurityContextHolder;

public class LoggedInUserUtil {
	
	private LoggedInUserUtil() {
		//
	}

	public static String getLoggedInUserName() {
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}
}
