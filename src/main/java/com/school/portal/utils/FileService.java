package com.school.portal.utils;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.school.portal.domain.User;

public class FileService {
	
    public static String targetDirectory = "C:\\home\\School_portal_Documents\\users\\profile_pic\\"; 


    public static Boolean saveFile(File file, User user) {
        // Define the target directory where the file will be saved

        try {
            // Create the target directory if it doesn't exist
            createDir();
            
            String fileExtension = file.getName().substring(file.getName().lastIndexOf("."));
            
            // Prepare the target file path
            String targetFilePath = targetDirectory 
            		+ user.getUserUuid()+ "_" + user.getFullName() + fileExtension;

            // Create the target file
            File targetFile = new File(targetFilePath);

            // Check if the target file already exists and delete it if needed
            if (targetFile.exists()) {
                if (!targetFile.delete()) {
                    // Unable to delete the existing file
                    return false;
                }
            }

            // Copy the new file to the target location
            Files.copy(file.toPath(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

            // File saved successfully
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            // Error occurred while saving the file
            return false;
        }
    }

	private static void createDir() {
		File directory = new File(targetDirectory);
		if (!directory.exists()) {
		    if (!directory.mkdirs()) {
		        // Directory creation failed
		    }
		}
	}

	public static File getFile(String userUuid) {
		File directory = new File(targetDirectory);
		File[] files = directory.listFiles();
        if (files == null) {
            return null;
        }
		
        for (File file : files) {
            if (file.isFile() && file.getName().contains(userUuid)) {
            	return file;
            }
        }
		return null;
	}
}
