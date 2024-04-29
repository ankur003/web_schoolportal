package com.school.portal.service;

import java.util.List;

import com.school.portal.domain.User;
import com.school.portal.domain.UserExperience;

public interface UserExperienceService {

	void saveOrUpdateUserExperiences(User user, List<UserExperience> userExperiences);

	List<UserExperience> getUserExperienceByUser(User user);

	UserExperience getUserExperienceByExperienceUuid(String userExperienceUuid);

	Boolean deleteUserExperience(String userExperienceUuid);

}
