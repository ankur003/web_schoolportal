package com.school.portal.requests;
import static com.school.portal.constants.ApplicationConstants.ERROR_MSG_SUFFIX;

import javax.validation.constraints.NotBlank;

public class SubmitOtpModel {

	@NotBlank(message = "username : User Name" + ERROR_MSG_SUFFIX)
    private String opt;

	public String getOpt() {
		return opt;
	}

	public void setOpt(String opt) {
		this.opt = opt;
	}
	
}