package com.school.portal.service.impl;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import org.apache.commons.lang3.BooleanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.school.portal.domain.Otp;
import com.school.portal.domain.Role;
import com.school.portal.domain.User;
import com.school.portal.dto.LoginUser;
import com.school.portal.repo.OtpRepo;
import com.school.portal.repo.RoleRepo;
import com.school.portal.repo.UserRepo;
import com.school.portal.requests.ChangePasswordModel;
import com.school.portal.requests.CreateUserModel;
import com.school.portal.service.UserService;
import com.school.portal.utils.SchoolPortalUtils;

@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService, UserService {

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Autowired
	private OtpRepo otpRepo;

	@Autowired
	private BCryptPasswordEncoder encoder;

	public UserDetails loadUserByUsername(String username) {
		User user = userRepo.findByUsernameAndIsActive(username, true);
		if (user == null) {
			throw new UsernameNotFoundException("Invalid username or password.");
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				getAuthority(user));
	}

	private Set<SimpleGrantedAuthority> getAuthority(User user) {
		Set<SimpleGrantedAuthority> authorities = new HashSet<>();
		user.getRoles().forEach(role -> 
			authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()))
		);
		return authorities;
	}

	@Override
	public User checkCredaintials(LoginUser loginUser) {
		User user = userRepo.findByUsernameAndIsActive(loginUser.getUsername(), true);
		if (Objects.isNull(user)) {
			return null;
		}
		boolean isValid = encoder.matches(loginUser.getPassword(), user.getPassword());
		if (isValid) {
			return user;
		}
		return null;
	}

	@Override
	public User getUser(String userEmail) {
		return userRepo.findByUsernameAndIsActive(userEmail, true);
	}

	@Override
	public String createUser(CreateUserModel createUserModel) {
		User user = userRepo.findByUsername(createUserModel.getUsername());
		if (user == null) {
			user = new User();
			user.setUsername(createUserModel.getUsername());
			user.setPassword(encoder.encode(createUserModel.getPassword()));
			user.setUserType(createUserModel.getUserType().name());
			user.setUserUuid(SchoolPortalUtils.getUniqueUuid());
			Role role = roleRepo.findByName(createUserModel.getUserType().name());
			if (role != null) {
				Set<Role> roles = new HashSet<>();
				roles.add(role);
				user.setRoles(roles);
				user.setUpdatedAt(LocalDateTime.now());
				user = userRepo.save(user);
				return user.getUserUuid();
			}
		}
		return null;
	}

	@Override
	public User getUserDetail(String username) {
		return userRepo.findByUsernameAndIsActive(username, true);
	}

	@Override
	public User getUserDetailByUuid(String userUuid) {
		return userRepo.findByUserUuidAndIsActive(userUuid, true);
	}

	@Override
	public User checkUser(String username) {
		return userRepo.findByUsername(username);
	}

	@Override
	public Boolean resetPassword(User user, Otp otp, String password) {
		user.setPassword(encoder.encode(password));
		user.setUpdatedAt(LocalDateTime.now());
		userRepo.save(user);
		otp.setIsUsed(true);
		otp.setUpdatedAt(LocalDateTime.now());
		otpRepo.save(otp);
		return true;
	}

	@Override
	public Boolean changePassword(User user, ChangePasswordModel changePasswordModel) {
		Boolean isValid = encoder.matches(user.getPassword(), changePasswordModel.getOldPassword());
		if (BooleanUtils.isTrue(isValid)) {
			user.setPassword(encoder.encode(changePasswordModel.getNewPassword()));
			user.setUpdatedAt(LocalDateTime.now());
			userRepo.save(user);
		}
		return isValid;
	}

}
