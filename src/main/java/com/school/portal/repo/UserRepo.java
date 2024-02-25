package com.school.portal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.school.portal.domain.User;

public interface UserRepo extends JpaRepository<User, Long> , PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User>{

	User findByUsernameAndIsActive(String username, Boolean isActive);
	
	User findByUsername(String username);

	User findByUserUuidAndIsActive(String userUuid, boolean isActive);


}
