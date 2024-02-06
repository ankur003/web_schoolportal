package com.school.portal.controller;

import java.util.List;

import javax.validation.Valid;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school.portal.AbstractController;
import com.school.portal.domain.MasterClass;
import com.school.portal.domain.MasterSection;
import com.school.portal.domain.User;
import com.school.portal.requests.AssignClassSectionStudentModel;
import com.school.portal.requests.CreateMasterClassModel;
import com.school.portal.requests.CreateMasterSectionsModel;
import com.school.portal.requests.CreateUserModel;
import com.school.portal.requests.LinkClassSectionModel;
import com.school.portal.requests.UpdateUserModel;
import com.school.portal.response.LinkedMasterClassModel;
import com.school.portal.response.MasterClassModel;
import com.school.portal.response.MasterSectionModel;
import com.school.portal.response.UserResponseModel;
import com.school.portal.service.MasterClassService;
import com.school.portal.service.UserService;
import com.school.portal.utils.ModelMapperUtil;
import com.school.portal.utils.ResponseBuilder;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/sa")
public class SuperAdminController extends AbstractController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private MasterClassService masterClassService;
	
	@PostMapping("/user")
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> createUser(@Valid @RequestBody CreateUserModel createUserModel) {
		String userUuid = userService.createUser(createUserModel);
		if (StringUtils.isBlank(userUuid)) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		}
		return ResponseBuilder.buildCreatedRespnse("userUuid", userUuid);
	}
	
	@GetMapping("/user/{userUuid}")
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> getUserDetail(@PathVariable("userUuid") String userUuid) {
		User user = userService.getUserDetailByUuid(userUuid);
		if (user == null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(
				ModelMapperUtil.map(modelMapper, user, UserResponseModel.class));
	}
	
	@PutMapping("/user/{userUuid}")
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> updateUserDetail(@RequestBody UpdateUserModel updateUserModel) {
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/master-class")
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> createMasterClasses(@RequestBody CreateMasterClassModel createMasterClassModel) {
		String classUuid = masterClassService.createMasterClass(createMasterClassModel);
		if (StringUtils.isBlank(classUuid)) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		}
		return ResponseBuilder.buildCreatedRespnse("classUuid", classUuid);
	}
	
	@GetMapping("/master-class")
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> getMasterClasses() {
		List<MasterClass> mClasses = masterClassService.getMasterClasses();
		if (CollectionUtils.isEmpty(mClasses)) {
			return ResponseEntity.noContent().build();
		}
		List<MasterClassModel> masterClassModels =  ModelMapperUtil.mapList(modelMapper, mClasses, MasterClassModel.class);
		return ResponseEntity.ok(masterClassModels);
	}
	
	@PostMapping("/master-section")
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> createMasterSection(@RequestBody CreateMasterSectionsModel createMasterSectionsModel) {
		String sectionUuid = masterClassService.createMasterSection(createMasterSectionsModel);
		if (StringUtils.isBlank(sectionUuid)) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		}
		return ResponseBuilder.buildCreatedRespnse("sectionUuid", sectionUuid);
	}
	
	@GetMapping("/master-section")
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> getMasterSections() {
		List<MasterSection> mSections = masterClassService.getMasterSections();
		if (CollectionUtils.isEmpty(mSections)) {
			return ResponseEntity.noContent().build();
		}
		List<MasterSectionModel> masterSectionModels =  ModelMapperUtil.mapList(modelMapper, mSections, MasterSectionModel.class);
		return ResponseEntity.ok(masterSectionModels);
	}
	
	@PostMapping("/class-section-link")
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> linkClassSections(@RequestBody LinkClassSectionModel linkClassSectionModel) {
		Boolean isLinked = masterClassService.linkClassSections(linkClassSectionModel);
		if (Boolean.TRUE.equals(isLinked)) {
			return ResponseEntity.status(HttpStatus.CREATED).build();
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		
	}
	
	@GetMapping("/class-section-link")
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> getLinkClassSections() {
		List<MasterClass> masterClasses =  masterClassService.getLinkedClassSections();
		if (CollectionUtils.isEmpty(masterClasses)) {
			return ResponseEntity.noContent().build();
		}
		List<LinkedMasterClassModel> linkedModels =  ModelMapperUtil.mapList(modelMapper, masterClasses, LinkedMasterClassModel.class);
		return ResponseEntity.ok(linkedModels);
	}
	
	@PostMapping("/s/{userUuid}/class-section-assign")
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> assignClassSectionToStudent(@PathVariable("userUuid") String userUuid, @RequestBody AssignClassSectionStudentModel assignClassSectionStudentModel) {
		Boolean isAssigned = masterClassService.assignClassSectionToStudent(userUuid, assignClassSectionStudentModel);
		if (Boolean.TRUE.equals(isAssigned)) {
			return ResponseEntity.status(HttpStatus.CREATED).build();
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
	}
	
}
