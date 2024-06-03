package com.school.portal.service;

import com.school.portal.domain.User;
import com.school.portal.domain.UserInfo;

public interface UserInfoService {

	UserInfo getUserInfo(User user);

	void saveorUpdateUserInfo(User savedUser, UserInfo userInfo);

}
