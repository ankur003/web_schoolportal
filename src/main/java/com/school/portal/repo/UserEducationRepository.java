package com.school.portal.repo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school.portal.domain.UserEducation;

public interface UserEducationRepository extends JpaRepository<UserEducation, Long> {

	UserEducation findByUserEducationUuid(String userEducationUuid);

	List<UserEducation> findByUserId(Long userId);

	
}