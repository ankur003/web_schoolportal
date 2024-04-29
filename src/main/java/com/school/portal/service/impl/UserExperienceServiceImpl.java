package com.school.portal.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.portal.domain.User;
import com.school.portal.domain.UserEducation;
import com.school.portal.domain.UserExperience;
import com.school.portal.repo.UserExperienceRepo;
import com.school.portal.service.UserExperienceService;
import com.school.portal.utils.SchoolPortalUtils;

@Service
public class UserExperienceServiceImpl implements UserExperienceService {

	@Autowired
	private UserExperienceRepo experienceRepo;
	
	@Override
	public void saveOrUpdateUserExperiences(User user, List<UserExperience> userExperiences) {
		List<UserExperience> existedUserExperiences = getUserExperienceByUser(user);
		if (CollectionUtils.isNotEmpty(existedUserExperiences)) {
			for (UserExperience userExperience : userExperiences) {
				for (UserExperience exstedUserExperiences : existedUserExperiences) {
					if (userExperience.getUserExperienceUuid() == null) {
						userExperience.setUser(user);
						userExperience.setUserExperienceUuid(SchoolPortalUtils.getUniqueUuid());
						userExperience.setCreatedAt(LocalDateTime.now());
						userExperience.setUpdatedAt(LocalDateTime.now());
						experienceRepo.save(userExperience);
					} else if (userExperience.getUserExperienceUuid().equals(exstedUserExperiences.getUserExperienceUuid())) {
						if (StringUtils.isNotBlank(userExperience.getDesignation() )) {
							exstedUserExperiences.setDesignation(userExperience.getDesignation());
						}
						if (StringUtils.isNotBlank(userExperience.getFromDate())) {
							exstedUserExperiences.setFromDate(userExperience.getFromDate());
						}
						if (StringUtils.isNotBlank(userExperience.getSchoolName())) {
							exstedUserExperiences.setSchoolName(userExperience.getSchoolName());
						}
						if (StringUtils.isNotBlank(userExperience.getTillDate())) {
							exstedUserExperiences.setTillDate(userExperience.getTillDate());
						}
						exstedUserExperiences.setUpdatedAt(LocalDateTime.now());
						experienceRepo.save(exstedUserExperiences);
					}
				}
			}
		} else {
			for (UserExperience userEexp : userExperiences) {
				userEexp.setUser(user);
				userEexp.setUserExperienceUuid((SchoolPortalUtils.getUniqueUuid()));
				userEexp.setCreatedAt(LocalDateTime.now());
				userEexp.setUpdatedAt(LocalDateTime.now());
				experienceRepo.save(userEexp);
			}
		}
	}
	
    @Override
    public List<UserExperience> getUserExperienceByUser(User user) {
        return experienceRepo.findByUser(user);
    }
    
    @Override
    public UserExperience getUserExperienceByExperienceUuid(String userExperienceUuid) {
        return experienceRepo.findByUserExperienceUuid(userExperienceUuid);
    }

	@Override
	public Boolean deleteUserExperience(String userExperienceUuid) {
		UserExperience userExperience = getUserExperienceByExperienceUuid(userExperienceUuid);
		if (userExperience != null) {
			experienceRepo.delete(userExperience);
		}
		return true;
	}

}
