package com.school.portal.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Random;
import java.util.UUID;

import org.apache.commons.lang3.RandomUtils;
import org.springframework.web.multipart.MultipartFile;

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
	
	public static final Integer getUnique5DigitInteger() {
		  // Get the current timestamp in milliseconds
        long timestamp = System.currentTimeMillis();

        // Extract the last 5 digits from the timestamp
        int last5Digits = (int) (timestamp % 100000);

        // Generate a random number between 10000 and 99999
        Random random = new Random();
        int randomPart = random.nextInt(90000) + 10000;

        // Combine the last 5 digits of the timestamp with the random number
        int uniqueId = last5Digits * 100000 + randomPart;

        return uniqueId;
	}
	
	public static File convertMultipartFileToFile(final MultipartFile file) {
        final File convFile = new File(System.getProperty("java.io.tmpdir") + File.separator + file.getOriginalFilename());
        try (final FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
            return convFile;
        } catch (final Exception exception) {
            return null;
        }
    }
}
