package com.school.portal.service;

import com.school.portal.domain.Otp;
import com.school.portal.domain.User;
import com.school.portal.requests.ResetPasswordModel;

public interface OtpService {

	Boolean sendForgotPasswordOtp(User user);

	Otp checkOtp(User user, ResetPasswordModel resetPasswordModel);

}
