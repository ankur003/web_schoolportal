package com.school.portal.repo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.school.portal.domain.Otp;
import com.school.portal.domain.User;

public interface OtpRepo extends JpaRepository<Otp, Long> { 
	
	Otp findByUser(User user);
	
	Otp findByUserAndOtpAndIsUsed(User user, Integer otp, Boolean isUsed);
}
