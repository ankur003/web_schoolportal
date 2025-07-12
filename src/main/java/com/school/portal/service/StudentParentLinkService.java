package com.school.portal.service;

import java.util.List;

import com.school.portal.domain.User;

public interface StudentParentLinkService {
    
	List<User> getStudentParentLinksByParentUuid(String parentUuId);
    
    List<User> getStudentParentLinksByStudentUuid(String studentUuid);

	void linkParantToStudent(Long parentId, Long studentId);

}