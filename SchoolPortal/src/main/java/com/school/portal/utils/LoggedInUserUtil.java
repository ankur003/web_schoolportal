package com.school.portal.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.school.portal.facade.AuthenticationFacade;

@Component
public class LoggedInUserUtil {

	@Autowired
	AuthenticationFacade authenticationFacade;

	public String getLoggedInUserName() {
		return authenticationFacade.getAuthentication().getName();
	}
}
