package com.school.portal.service;

import com.school.portal.domain.User;
import com.school.portal.dto.LoginUser;
import com.school.portal.requests.CreateUserModel;

public interface UserService {

	public User checkCredaintials(LoginUser loginUser);

	public User getUser(String userEmail);

	public String createUser(CreateUserModel createUserModel);

	public User getUserDetail(String username);

	public User getUserDetailByUuid(String userUuid);

}
