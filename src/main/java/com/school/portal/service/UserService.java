package com.school.portal.service;

import org.springframework.data.domain.Page;

import com.school.portal.domain.Otp;
import com.school.portal.domain.User;
import com.school.portal.dto.LoginUser;
import com.school.portal.requests.ChangePasswordModel;
import com.school.portal.requests.CreateUserModel;
import com.school.portal.requests.UserRequestModel;

public interface UserService {

	public User checkCredaintials(LoginUser loginUser);

	public User getUser(String userEmail);
	
	public User checkUser(String username);

	public String createUser(CreateUserModel createUserModel);

	public User getUserDetail(String username);

	public User getUserDetailByUuid(String userUuid);

	public Boolean resetPassword(User user, Otp otp, String password);

	public Boolean changePassword(User user, ChangePasswordModel changePasswordModel);

	Page<User> getAllUsers(UserRequestModel userRequestModel);

}
