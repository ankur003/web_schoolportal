package com.school.portal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school.portal.domain.User;
import com.school.portal.domain.UserExperience;

public interface UserExperienceRepo extends JpaRepository<UserExperience, Long> {

	List<UserExperience> findByUser(User user);

	UserExperience findByUserExperienceUuid(String userExperienceUuid);
	
}