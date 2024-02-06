package com.school.portal.utils;

import java.util.UUID;

public final class SchoolPortalUtils {
	
	private SchoolPortalUtils() {
		//
	}

	public static final String getUniqueUuid() {
		return UUID.randomUUID().toString();
	}
}
