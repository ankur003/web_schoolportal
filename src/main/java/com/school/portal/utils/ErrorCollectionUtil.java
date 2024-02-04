/**
 * 
 */
package com.school.portal.utils;

import java.util.Map;
import java.util.TreeMap;

import org.springframework.validation.BindingResult;

/**
 * @author
 *
 */
public class ErrorCollectionUtil {

	private static final String DEFAULT_ERROR_MESSAGE = "Wrong data requested";

	private ErrorCollectionUtil() {
	}

	public static Map<String, Object> getErrorMap(BindingResult bindingResult) {
		Map<String, Object> errors = new TreeMap<>();

		bindingResult.getFieldErrors()
				.forEach(fieldError -> errors.put(fieldError.getField(), fieldError.getDefaultMessage()));
		return errors;
	}

	// TODO correct it
	public static <T> String getError(BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return DEFAULT_ERROR_MESSAGE;
		}
		return null;

	}
}
