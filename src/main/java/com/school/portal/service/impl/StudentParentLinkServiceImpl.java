package com.school.portal.service.impl;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.portal.domain.StudentParentLink;
import com.school.portal.domain.User;
import com.school.portal.enums.UserType;
import com.school.portal.repo.StudentParentLinkRepository;
import com.school.portal.repo.UserRepo;
import com.school.portal.service.StudentParentLinkService;

@Service
public class StudentParentLinkServiceImpl implements StudentParentLinkService {

	@Autowired
	private StudentParentLinkRepository studentParentLinkRepository;

	@Autowired
	private UserRepo userRepository;

	@Override
	public List<User> getStudentParentLinksByParentUuid(String parentUuId) {
		User user = userRepository.findByUserUuidAndIsActive(parentUuId, true);
		if (user == null) {
			return Collections.emptyList();
		}
		List<StudentParentLink> links = studentParentLinkRepository.findByParentId(user.getUserId());
		List<Long> studentIds = links.stream().map(StudentParentLink::getStudentId).collect(Collectors.toList());

		if (studentIds.isEmpty()) {
			return Collections.emptyList();
		}

		return userRepository.findByUserIdInAndUserType(studentIds, UserType.STUDENT.name());
	}

	@Override
	public List<User> getStudentParentLinksByStudentUuid(String studentUuid) {

		User user = userRepository.findByUserUuidAndIsActive(studentUuid, true);
		if (user == null) {
			return Collections.emptyList();
		}

		List<StudentParentLink> links = studentParentLinkRepository.findByStudentId(user.getUserId());
		List<Long> parentIds = links.stream().map(StudentParentLink::getParentId).collect(Collectors.toList());

		if (parentIds.isEmpty()) {
			return Collections.emptyList();
		}

		return userRepository.findByUserIdInAndUserType(parentIds, UserType.PARENT.name());
	}

	@Override
	public void linkParantToStudent(Long parentId, Long studentId) {

		List<StudentParentLink> data = studentParentLinkRepository.findByStudentIdAndParentId(studentId, parentId);
		if (CollectionUtils.isEmpty(data)) {
			StudentParentLink studentParentLink = new StudentParentLink();
			studentParentLink.setStudentId(studentId);
			studentParentLink.setParentId(parentId);
			studentParentLink.setCreatedAt(new Date());
			studentParentLink.setUpdatedAt(new Date());
			studentParentLinkRepository.save(studentParentLink);
		}
		
	}
}
