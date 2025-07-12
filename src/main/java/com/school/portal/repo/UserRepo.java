package com.school.portal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.school.portal.domain.MasterClass;
import com.school.portal.domain.MasterSection;
import com.school.portal.domain.User;

public interface UserRepo extends JpaRepository<User, Long> , PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User>{

	User findByUsernameAndIsActive(String username, Boolean isActive);
	
	User findByUsername(String username);

	User findByUserUuidAndIsActive(String userUuid, boolean isActive);

	List<User> findByMasterClassAndMasterSection(MasterClass masterClass, MasterSection masterSection);

	List<User> findByMasterClass(MasterClass masterClass);

	List<User> findByUserIdInAndUserType(List<Long> studentIds, String string);


}
