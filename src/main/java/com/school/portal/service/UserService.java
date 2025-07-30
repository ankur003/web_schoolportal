package com.school.portal.service;

import java.io.File;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;

import com.school.portal.domain.Address;
import com.school.portal.domain.Otp;
import com.school.portal.domain.User;
import com.school.portal.dto.LoginUser;
import com.school.portal.enums.ApprovalStatus;
import com.school.portal.enums.AttendanceStatus;
import com.school.portal.requests.ChangePasswordModel;
import com.school.portal.requests.CreateUserModel;
import com.school.portal.requests.UpdateUserModel;
import com.school.portal.requests.UserRequestModel;
import com.school.portal.response.AttendanceMonthlyReportResponse;
import com.school.portal.response.UserAttendanceModel;
import com.school.portal.response.UserResponseModel;

public interface UserService {

	public User checkCredentials(LoginUser loginUser);

	public User getUser(String userEmail);
	
	public User checkUser(String username);

	public String createUser(CreateUserModel createUserModel);

	public User getUserDetail(String username);

	public User getUserDetailByUuid(String userUuid);

	public Boolean resetPassword(User user, Otp otp, String password);

	public Boolean changePassword(User user, ChangePasswordModel changePasswordModel);

	Page<UserResponseModel> getAllUsers(UserRequestModel userRequestModel);
	
	public Boolean saveFile(File file, User user);

	public File downloadUserProfilePic(User user);

	public Address getAddress(User user);

	public Boolean updateUserDetails(User user, UpdateUserModel updateUserModel);

	void markAttendance(User user, AttendanceStatus status, LocalDate date, String catagory);

    List<UserAttendanceModel> getUserAttendance(String userUuid, ApprovalStatus status, LocalDate date);

	Boolean updateAttendance(String userUuid, ApprovalStatus status, LocalDate date, String catagory);

	AttendanceMonthlyReportResponse getUserAttendanceForMonth(String userUuid, int year, int month);
}
