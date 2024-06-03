package com.school.portal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.portal.domain.User;
import com.school.portal.domain.UserInfo;
import com.school.portal.repo.UserInfoRepo;
import com.school.portal.service.UserInfoService;

@Service
public class UserInfoServiceImpl implements UserInfoService {

	@Autowired
	private UserInfoRepo userInfoRepo;
	
	@Override
	public UserInfo getUserInfo(User user) {
		
		return userInfoRepo.findByUser(user);
	}

}
