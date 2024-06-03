package com.school.portal.service.impl;

import java.time.LocalDateTime;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.portal.domain.User;
import com.school.portal.domain.UserInfo;
import com.school.portal.repo.UserInfoRepo;
import com.school.portal.service.UserInfoService;
import com.school.portal.utils.SchoolPortalUtils;

@Service
public class UserInfoServiceImpl implements UserInfoService {

	@Autowired
	private UserInfoRepo userInfoRepo;
	
	@Override
	public UserInfo getUserInfo(User user) {
		
		return userInfoRepo.findByUser(user);
	}

	@Override
	public void saveorUpdateUserInfo(User savedUser, UserInfo userInfo) {
		UserInfo existedUserInfo = getUserInfo(savedUser);
		if (existedUserInfo == null) {
			existedUserInfo = new UserInfo();
			existedUserInfo.setUserInfoUuid(SchoolPortalUtils.getUniqueUuid());
			existedUserInfo.setUser(savedUser);
			existedUserInfo.setCreatedAt(LocalDateTime.now());
		}
		if (StringUtils.isNotBlank(userInfo.getBloodGroup())) {
			existedUserInfo.setBloodGroup(userInfo.getBloodGroup());
		}
		if (StringUtils.isNotBlank(userInfo.getFatherEmail())) {
			existedUserInfo.setFatherEmail(userInfo.getFatherEmail());
		}
		if (StringUtils.isNotBlank(userInfo.getFatherName())) {
			existedUserInfo.setFatherName(userInfo.getFatherName());
		}
		if (StringUtils.isNotBlank(userInfo.getFatherOccupation())) {
			existedUserInfo.setFatherOccupation(userInfo.getFatherOccupation());
		}
		if (StringUtils.isNotBlank(userInfo.getFatherPh())) {
			existedUserInfo.setFatherPh(userInfo.getFatherPh());
		}
		if (StringUtils.isNotBlank(userInfo.getMotherEmail())) {
			existedUserInfo.setMotherEmail(userInfo.getMotherEmail());
		}
		if (StringUtils.isNotBlank(userInfo.getMotherName())) {
			existedUserInfo.setMotherName(userInfo.getMotherName());
		}
		if (StringUtils.isNotBlank(userInfo.getMotherOccupation())) {
			existedUserInfo.setMotherOccupation(userInfo.getMotherOccupation());
		}
		if (StringUtils.isNotBlank(userInfo.getMotherPh())) {
			existedUserInfo.setMotherPh(userInfo.getMotherPh());
		}
		existedUserInfo.setUpdatedAt(LocalDateTime.now());
		userInfoRepo.save(existedUserInfo);
	}

}
