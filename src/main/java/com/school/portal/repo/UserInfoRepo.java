package com.school.portal.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school.portal.domain.User;
import com.school.portal.domain.UserInfo;

public interface UserInfoRepo extends JpaRepository<UserInfo, Long> {

	UserInfo findByUser(User user);

}
