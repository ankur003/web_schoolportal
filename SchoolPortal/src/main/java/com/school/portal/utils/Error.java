package com.school.portal.utils;

import com.school.portal.enums.ErrorCode;

/**
 * @author Ankur Bansala
 *
 * @date 
 *
 */
public class Error {

	public Error(String errorMessage, ErrorCode errorCode, String message) {
		this.errorMessage = errorMessage;
		this.errorCode = errorCode;
		this.errorDesription = message;

	}

	private String errorMessage;

	private String errorDesription;

	private ErrorCode errorCode;

	/**
	 * @return the errorMessage
	 */
	public String getErrorMessage() {
		return errorMessage;
	}

	/**
	 * @param errorMessage
	 *            the errorMessage to set
	 */
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	/**
	 * @return the errorDesription
	 */
	public String getErrorDesription() {
		return errorDesription;
	}

	/**
	 * @param errorDesription
	 *            the errorDesription to set
	 */
	public void setErrorDesription(String errorDesription) {
		this.errorDesription = errorDesription;
	}

	/**
	 * @return the errorCode
	 */
	public ErrorCode getErrorCode() {
		return errorCode;
	}

	/**
	 * @param errorCode
	 *            the errorCode to set
	 */
	public void setErrorCode(ErrorCode errorCode) {
		this.errorCode = errorCode;
	}

}