package com.school.portal.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.InputStreamResource;

public class CleanupInputStreamResource  extends InputStreamResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(CleanupInputStreamResource.class);

    public CleanupInputStreamResource(final File file) throws FileNotFoundException {
        super(new FileInputStream(file) {
            @Override
            public void close() throws IOException {
                super.close();
//                if (!FileUtils.deleteQuietly(file)) {
//                    LOGGER.warn("FAILED TO DELETE FILE - '{}'", file.getAbsolutePath());
//                }
            }
        });
    }
}
