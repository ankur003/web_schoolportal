package com.school.portal.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.portal.domain.User;
import com.school.portal.domain.UserEducation;
import com.school.portal.repo.UserEducationRepository;
import com.school.portal.service.UserEducationService;
import com.school.portal.utils.SchoolPortalUtils;

@Service
public class UserEducationServiceImpl implements UserEducationService {

    @Autowired
    private UserEducationRepository userEducationRepository;
    
    @Override
    public List<UserEducation> getUserEducationByUserId(Long userId) {
        return userEducationRepository.findByUserId(userId);
    }
    
    @Override
    public UserEducation getUserEducation(String userEducationUuid) {
        return userEducationRepository.findByUserEducationUuid(userEducationUuid);
    }

    @Override
	public Boolean saveOrUpdateUserEducations(User user, List<UserEducation> userEducations) {
		List<UserEducation> existedUserEducations = getUserEducationByUserId(user.getUserId());
		
		if (CollectionUtils.isNotEmpty(existedUserEducations)) {
			for (UserEducation userEducation : userEducations) {
				for (UserEducation exstedUserEducation : existedUserEducations) {
					if (userEducation.getUserEducationUuid() == null) {
						userEducation.setUserId(user.getUserId());
						userEducation.setUserEducationUuid(SchoolPortalUtils.getUniqueUuid());
						userEducation.setCreatedAt(LocalDateTime.now());
						userEducation.setUpdatedAt(LocalDateTime.now());
			            userEducationRepository.save(userEducation);
					} else if (userEducation.getUserEducationUuid().equals(exstedUserEducation.getUserEducationUuid())) {
						if (StringUtils.isNotBlank(userEducation.getGrade())) {
							exstedUserEducation.setGrade(userEducation.getGrade());
						}
						if (StringUtils.isNotBlank(userEducation.getLastPassoutClassName())) {
							exstedUserEducation.setLastPassoutClassName(userEducation.getLastPassoutClassName());
						}
						if (StringUtils.isNotBlank(userEducation.getPecentage())) {
							exstedUserEducation.setPecentage(userEducation.getPecentage());
						}
						if (StringUtils.isNotBlank(userEducation.getSchoolAddress())) {
							exstedUserEducation.setSchoolAddress(userEducation.getSchoolAddress());
						}
						if (StringUtils.isNotBlank(userEducation.getSchoolName())) {
							exstedUserEducation.setSchoolName(userEducation.getSchoolName());
						}
						if (StringUtils.isNotBlank(userEducation.getPassOutYear())) {
							exstedUserEducation.setPassOutYear(userEducation.getPassOutYear());
						}
						exstedUserEducation.setUpdatedAt(LocalDateTime.now());
			            userEducationRepository.save(exstedUserEducation);
					}
				}
			}
		} else {
			for (UserEducation userEdu : userEducations) {
					userEdu.setUserId(user.getUserId());
					userEdu.setUserEducationUuid(SchoolPortalUtils.getUniqueUuid());
					userEdu.setCreatedAt(LocalDateTime.now());
					userEdu.setUpdatedAt(LocalDateTime.now());
			        userEducationRepository.save(userEdu);
			}
		}
		return true;
	}

	@Override
	public Boolean deleteUserEducation(String userEducationUuid) {
		UserEducation userEducation = getUserEducation(userEducationUuid);
		if (userEducation != null) {
			userEducationRepository.delete(userEducation);
		}
		return true;
	}
}