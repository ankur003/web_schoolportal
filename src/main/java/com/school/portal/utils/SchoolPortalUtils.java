package com.school.portal.utils;

import java.util.UUID;

import org.apache.commons.lang3.RandomUtils;

public final class SchoolPortalUtils {
	
	private SchoolPortalUtils() {
		//
	}

	public static final String getUniqueUuid() {
		return UUID.randomUUID().toString();
	}
	
	public static final Integer getUniqueInteger() {
		return RandomUtils.nextInt(1000, 10000);
	}
}
