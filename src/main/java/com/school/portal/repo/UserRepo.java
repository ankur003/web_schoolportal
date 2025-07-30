package com.school.portal.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.school.portal.domain.User;
import com.school.portal.response.UserResponseModel;

public interface UserRepo
		extends JpaRepository<User, Long>, PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User> {

	User findByUsernameAndIsActive(String username, Boolean isActive);

	User findByUsername(String username);

	User findByUserUuidAndIsActive(String userUuid, boolean isActive);

	List<User> findByUserIdInAndUserType(List<Long> studentIds, String string);

	@Query("SELECT new com.school.portal.response.UserResponseModel(" +
		       "u.userId, u.userUuid, u.username, mc.className, ms.sectionName, u.fullName, u.phoneNo, u.userType, " +
		       "u.dob, u.doj, u.isAdmin, u.isSuperAdmin, u.isClassTeacher, u.isActive, u.createdAt, u.updatedAt, " +
		       "u.createdBy, u.rollNumber, u.enrollmentNumber, mc.masterClassUuid, ms.masterSectionUuid, ucs.academicYear" +
		       ") " +
		       "FROM User u " +
		       "LEFT JOIN UserClassSection ucs ON ucs.user = u AND ucs.isActive = true " +
		       "LEFT JOIN ucs.masterClass mc " +
		       "LEFT JOIN ucs.masterSection ms " +
		       "WHERE (:fullName IS NULL OR LOWER(u.fullName) LIKE LOWER(CONCAT('%', :fullName, '%'))) " +
		       "AND (:username IS NULL OR LOWER(u.username) LIKE LOWER(CONCAT('%', :username, '%'))) " +
		       "AND (:userType IS NULL OR u.userType = :userType) " +
		       "AND u.isActive = true " +
		       "ORDER BY u.userId DESC")
		Page<UserResponseModel> findUsersWithOptionalFilters(
		            @Param("fullName") String fullName,
		            @Param("username") String username,
		            @Param("userType") String userType,
		            Pageable pageable);



}
