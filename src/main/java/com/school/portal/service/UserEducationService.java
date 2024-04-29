package com.school.portal.service;

import java.util.List;

import com.school.portal.domain.User;
import com.school.portal.domain.UserEducation;

public interface UserEducationService {

	List<UserEducation> getUserEducationByUserId(Long userId);

	Boolean saveOrUpdateUserEducations(User user, List<UserEducation> userEducations);
	
	public UserEducation getUserEducation(String userEducationUuid);

	Boolean deleteUserEducation(String userEducationUuid);

}
