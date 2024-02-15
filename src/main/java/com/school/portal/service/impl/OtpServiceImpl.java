package com.school.portal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.school.portal.domain.Otp;
import com.school.portal.domain.User;
import com.school.portal.enums.OtpType;
import com.school.portal.repo.OtpRepo;
import com.school.portal.requests.ResetPasswordModel;
import com.school.portal.service.EmailService;
import com.school.portal.service.OtpService;
import com.school.portal.utils.SchoolPortalUtils;

@Service
public class OtpServiceImpl implements OtpService {
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private OtpRepo otpRepo;
	
	@Override
	public Boolean sendForgotPasswordOtp(User user) {
		Context context = new Context();
		Integer otpInteger = SchoolPortalUtils.getUniqueInteger();
        context.setVariable("otp", otpInteger);
        emailService.sendForgotPassEmail(user, "Otp | School Portal", "otpp", context);
        Otp otp = otpRepo.findByUser(user);
        if (otp == null) {
        	otp = new Otp();
        	otp.setOtpUuid(SchoolPortalUtils.getUniqueUuid());
        	otp.setUser(user);
        }
        otp.setOtp(otpInteger);
		otp.setOtpType(OtpType.FORGOT_PASSWORD.name());
		otp.setIsUsed(false);
		otpRepo.save(otp);
        return true;
	}

	@Override
	public Otp checkOtp(User user, ResetPasswordModel resetPasswordModel) {
		return otpRepo.findByUserAndOtpAndIsUsed(user, resetPasswordModel.getOtp(), false);
	}

}
