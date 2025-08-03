package com.school.portal.controller;

import java.io.File;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.school.portal.AbstractController;
import com.school.portal.domain.Address;
import com.school.portal.domain.Holidays;
import com.school.portal.domain.MasterClass;
import com.school.portal.domain.MasterSection;
import com.school.portal.domain.User;
import com.school.portal.domain.UserClassSection;
import com.school.portal.domain.UserEducation;
import com.school.portal.domain.UserExperience;
import com.school.portal.domain.UserInfo;
import com.school.portal.enums.AcademicYear;
import com.school.portal.enums.ApprovalStatus;
import com.school.portal.enums.UserType;
import com.school.portal.repo.UserClassSectionRepository;
import com.school.portal.requests.AssignClassSectionStudentModel;
import com.school.portal.requests.CreateMasterClassModel;
import com.school.portal.requests.CreateMasterSectionsModel;
import com.school.portal.requests.CreateUserModel;
import com.school.portal.requests.HolidaysRequestModel;
import com.school.portal.requests.LinkClassSectionModel;
import com.school.portal.requests.UpdateUserModel;
import com.school.portal.requests.UserRequestModel;
import com.school.portal.response.LinkedMasterClassModel;
import com.school.portal.response.MasterClassModel;
import com.school.portal.response.MasterSectionModel;
import com.school.portal.response.UserAttendanceModel;
import com.school.portal.response.UserResponseModel;
import com.school.portal.service.HolidayService;
import com.school.portal.service.MasterClassService;
import com.school.portal.service.UserEducationService;
import com.school.portal.service.UserExperienceService;
import com.school.portal.service.UserInfoService;
import com.school.portal.service.UserService;
import com.school.portal.utils.LoggedInUserUtil;
import com.school.portal.utils.ModelMapperUtil;
import com.school.portal.utils.ResponseBuilder;
import com.school.portal.utils.SchoolPortalUtils;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/sa")
public class SuperAdminController extends AbstractController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private MasterClassService masterClassService;
	
	@Autowired
	private UserEducationService userEducationService;
	
	@Autowired
	private UserExperienceService userExperience;
	
	@Autowired
	private HolidayService holidayService;
	
	@Autowired
	private UserInfoService userInfoService;
	
	@Autowired
	private UserClassSectionRepository userClassSectionRepository;

	
	@PostMapping("/user")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> createUser(@Valid @RequestBody CreateUserModel createUserModel) {
		if (createUserModel.getUserType().equals(UserType.TEACHER) &&  (StringUtils.isNotBlank(createUserModel.getClassUuid()) 
				|| StringUtils.isNotBlank(createUserModel.getSectionUuid()))) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		
		if (StringUtils.isNotBlank(createUserModel.getSectionUuid()) && 
				StringUtils.isBlank(createUserModel.getClassUuid()) ) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		
		if (createUserModel.getUserType().equals(UserType.PARENT) && (StringUtils.isBlank(createUserModel.getClassUuid())
				|| StringUtils.isBlank(createUserModel.getSectionUuid()))) {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You are creating the parent witout passing either student classUuid or student sectionUuid");
		}
		
		String userUuid = userService.createUser(createUserModel);
		if (StringUtils.isBlank(userUuid)) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		}
		return ResponseBuilder.buildCreatedRespnse("userUuid", userUuid);
	}
	
	@GetMapping("/user/{userUuid}")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> getUserDetail(@NotBlank(message = "userUuid can not be blank") @PathVariable("userUuid") String userUuid) {
		User user = userService.getUserDetailByUuid(userUuid);
		if (user == null) {
			return ResponseEntity.noContent().build();
		}
		Address address = userService.getAddress(user);
		List<UserEducation> userEducations = userEducationService.getUserEducationByUserId(user.getUserId());
		List<UserExperience> userExps = userExperience.getUserExperienceByUser(user);
		UserInfo info = userInfoService.getUserInfo(user);
		UserClassSection classSection = userClassSectionRepository.findByUserAndAcademicYear(user, LoggedInUserUtil.getLoginUserAcadmicYear());
		UserResponseModel responseModel = modelMapper.map(user, UserResponseModel.class);
		if (address != null) {
			responseModel.setAddress(address);
		}
		if (CollectionUtils.isNotEmpty(userEducations)) {
			responseModel.setUserEducations(userEducations);
		}
		if (CollectionUtils.isNotEmpty(userExps)) {
			responseModel.setUserExperiences(userExps);
		}
		if (info != null) {
			responseModel.setUserInfo(info);
		}
		if (classSection != null) {
			responseModel.setClassName(classSection.getMasterClass().getClassName());
			responseModel.setMasterClassUuid(classSection.getMasterClass().getMasterClassUuid());
			MasterSection ms = classSection.getMasterSection();
			responseModel.setSectionName(ms == null ? null :  ms.getSectionName());
			responseModel.setMasterSectionUuid(ms == null ? null :  ms.getMasterSectionUuid());
		}
		return ResponseEntity.ok(responseModel);
	}
	
	@GetMapping("/user")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> getAllUsers(@ModelAttribute UserRequestModel userRequestModel) {
		validate(userRequestModel);
		Page<UserResponseModel> users = userService.getAllUsers(userRequestModel);
		if (users == null || users.isEmpty() || CollectionUtils.isEmpty(users.getContent())) {
			return ResponseEntity.noContent().build();
		}
		List<UserResponseModel> usersData = users.getContent();
		
		
		final Map<String, Object> responseMap = ModelMapperUtil.mapPaginationData(users, usersData);
		return ResponseEntity.ok(responseMap);
	}

	@PutMapping("/user/{userUuid}")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> updateUserDetail(@NotBlank(message = "userUuid can not be blank") @PathVariable ("userUuid") String userUuid,
		@RequestBody UpdateUserModel updateUserModel) {
		User user = userService.getUserDetailByUuid(userUuid);
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		}
		Boolean isUpdated = userService.updateUserDetails(user, updateUserModel);
		return ResponseBuilder.buildBooleanRespnse(isUpdated);
	}
	
	@PostMapping("/master-class")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> createMasterClasses(@Valid @RequestBody CreateMasterClassModel createMasterClassModel) {
		String classUuid = masterClassService.createMasterClass(createMasterClassModel);
		if (StringUtils.isBlank(classUuid)) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		}
		return ResponseBuilder.buildCreatedRespnse("classUuid", classUuid);
	}
	
	@GetMapping("/master-class")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> getMasterClasses() {
		List<MasterClass> mClasses = masterClassService.getMasterClasses();
		if (CollectionUtils.isEmpty(mClasses)) {
			return ResponseEntity.noContent().build();
		}
		List<MasterClassModel> masterClassModels =  ModelMapperUtil.mapList(modelMapper, mClasses, MasterClassModel.class);
		return ResponseEntity.ok(masterClassModels);
	}
	
	@PostMapping("/master-section")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> createMasterSection(@Valid @RequestBody CreateMasterSectionsModel createMasterSectionsModel) {
		String sectionUuid = masterClassService.createMasterSection(createMasterSectionsModel);
		if (StringUtils.isBlank(sectionUuid)) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		}
		return ResponseBuilder.buildCreatedRespnse("sectionUuid", sectionUuid);
	}
	
	@GetMapping("/master-section")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> getMasterSections() {
		List<MasterSection> mSections = masterClassService.getMasterSections();
		if (CollectionUtils.isEmpty(mSections)) {
			return ResponseEntity.noContent().build();
		}
		List<MasterSectionModel> masterSectionModels =  ModelMapperUtil.mapList(modelMapper, mSections, MasterSectionModel.class);
		return ResponseEntity.ok(masterSectionModels);
	}
	
	@PostMapping("/class-section-link")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> linkClassSections(@Valid @RequestBody LinkClassSectionModel linkClassSectionModel) {
		Boolean isLinked = masterClassService.linkClassSections(linkClassSectionModel);
		if (Boolean.TRUE.equals(isLinked)) {
			return ResponseEntity.status(HttpStatus.CREATED).build();
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		
	}
	
	@GetMapping("/class-section-link")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> getLinkClassSections() {
		List<MasterClass> masterClasses =  masterClassService.getLinkedClassSections();
		if (CollectionUtils.isEmpty(masterClasses)) {
			return ResponseEntity.noContent().build();
		}
		List<LinkedMasterClassModel> linkedModels =  ModelMapperUtil.mapList(modelMapper, masterClasses, LinkedMasterClassModel.class);
		return ResponseEntity.ok(linkedModels);
	}
	
	@PostMapping("/s/{userUuid}/class-section-assign")
	////@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> assignClassSectionToStudent(@NotBlank(message = "userUuid can not be blank") @PathVariable("userUuid") String userUuid, 
			@Valid @RequestBody AssignClassSectionStudentModel assignClassSectionStudentModel) {
		Boolean isAssigned = masterClassService.assignClassSectionToStudent(userUuid, assignClassSectionStudentModel);
		if (Boolean.TRUE.equals(isAssigned)) {
			return ResponseEntity.status(HttpStatus.CREATED).build();
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
	}
	
	@PutMapping("/{userUuid}/profile-pic")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> saveOrUpdateUserProfilePic(@NotBlank(message = "userUuid can not be blank") @PathVariable("userUuid") String userUuid,
			@RequestParam("file") final MultipartFile multipartFile) {
		User user = userService.getUserDetailByUuid(userUuid);
		if (user == null || multipartFile == null || multipartFile.isEmpty() || multipartFile.getSize() <=0) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		}
		File file = SchoolPortalUtils.convertMultipartFileToFile(multipartFile);
		Boolean isSaved = userService.saveFile(file, user);
		return ResponseBuilder.buildBooleanRespnse(isSaved);
	}
	
	@GetMapping(value = "/{userUuid}/profile-pic", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_OCTET_STREAM_VALUE })
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> downloadUserProfilePic(
			@NotBlank(message = "userUuid can not be blank") @PathVariable("userUuid") String userUuid) {
		User user = userService.getUserDetailByUuid(userUuid);
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		File file = userService.downloadUserProfilePic(user);
		if (file == null || file.length() <= 0) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseBuilder.getDocumentResponse(file);
	}
	
	@DeleteMapping("/{userEducationUuid}/education")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> deleteUserEducation(@NotBlank(message = "userEducationUuid can not be blank") @PathVariable("userEducationUuid") String userEducationUuid) {
		Boolean isDeleted = userEducationService.deleteUserEducation(userEducationUuid);
		return ResponseBuilder.buildBooleanRespnse(isDeleted);
	}
	
	@DeleteMapping("/{userExperienceUuid}/experience")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> deleteUserExperience(@NotBlank(message = "userExperienceUuid can not be blank") @PathVariable("userExperienceUuid") String userExperienceUuid) {
		Boolean isDeleted = userExperience.deleteUserExperience(userExperienceUuid);
		return ResponseBuilder.buildBooleanRespnse(isDeleted);
	}
	
	@PutMapping("/holidays")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> saveHolidays(@Valid @RequestBody HolidaysRequestModel holiday) {
		holidayService.saveHolidays(holiday);
		return ResponseBuilder.buildBooleanRespnse(true);
	}
	
	@GetMapping("/holidays")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> getAllHolidays() {
		List<Holidays> holidays = holidayService.getHolidays();
		if (CollectionUtils.isEmpty(holidays)) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(holidays);
	}
	
	@GetMapping("{holidayUuid}/holidays")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> getHolidayDetails(@NotBlank(message = "holidayUuid can not be blank") @PathVariable("holidayUuid") String holidayUuid) {
		Holidays holiday = holidayService.getHolidayDetails(holidayUuid);
		if (holiday == null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(holiday);
	}
	
	@PutMapping("{holidayUuid}/holidays")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> updateHolidayDetails(@NotBlank(message = "holidayUuid can not be blank") @PathVariable("holidayUuid") String holidayUuid,
			@Valid @RequestBody Holidays holidays) {
		Holidays holiday = holidayService.getHolidayDetails(holidayUuid);
		if (holiday == null) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		}
		holidayService.updateHolidayDetails(holiday, holidays);
		return ResponseEntity.ok(holiday);
	}
	
	@DeleteMapping("{holidayUuid}/holidays")
	//@PreAuthorize("hasRole('SUPER_ADMIN')")
	public ResponseEntity<Object> deleteHoliday(@NotBlank(message = "holidayUuid can not be blank") @PathVariable("holidayUuid") String holidayUuid) {
		Holidays holiday = holidayService.getHolidayDetails(holidayUuid);
		if (holiday != null) {
			holidayService.deleteHolidayDetails(holiday);
		}
		return ResponseEntity.ok().build();
	}

	@GetMapping("/attendance")
	public ResponseEntity<Object> getAttendanceList(@RequestParam(name = "userId", required = false) String userUuid,
													@RequestParam(name = "status", required = false) ApprovalStatus status,
													@RequestParam(name = "date", required = false) LocalDate date) {
		List<UserAttendanceModel> userAttendanceModels =  userService.getUserAttendance(userUuid, status, date);
		return ResponseEntity.ok(userAttendanceModels);
	}

	@PutMapping("/attendance")
	public ResponseEntity<Object> updateAttendance(@RequestParam(name = "userId") String userUuid,
												   @RequestParam(name = "status") ApprovalStatus status,
												   @RequestParam(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
												   @RequestParam String catagory) {
		if (catagory.equals("ATTENDANCE") || catagory.equals("LEAVE")) { 
			Boolean isUpdated = userService.updateAttendance(userUuid, status, date, catagory);
			return ResponseEntity.ok(isUpdated); 
		}
		return ResponseEntity.badRequest().build();
	}
	
	
	private void validate(UserRequestModel userRequestModel) {
		if (userRequestModel.getClassName() != null && userRequestModel.getClassName().contains("Select")) {
			userRequestModel.setClassName(null);
		}
		
		if (userRequestModel.getSectionName() != null && userRequestModel.getSectionName().contains("Select")) {
			userRequestModel.setSectionName(null);
		}
		
		if (userRequestModel.getUsername() != null && userRequestModel.getUsername().contains("Select")) {
			userRequestModel.setUsername(null);
		}
		
		if (userRequestModel.getUserType() != null && userRequestModel.getUserType().contains("Select")) {
			userRequestModel.setUserType(null);
		}
		
		if (userRequestModel.getFullName() != null && userRequestModel.getFullName().contains("Select")) {
			userRequestModel.setFullName(null);
		}
		
		if (StringUtils.isBlank(userRequestModel.getClassName())) {
			userRequestModel.setClassName(null);
		}
		
		if (StringUtils.isBlank(userRequestModel.getSectionName())) {
			userRequestModel.setSectionName(null);
		}
		
		if (StringUtils.isBlank(userRequestModel.getUsername())) {
			userRequestModel.setUsername(null);
		}
		
		if (StringUtils.isBlank(userRequestModel.getUserType())) {
			userRequestModel.setUserType(null);
		}
		
		if (StringUtils.isBlank(userRequestModel.getFullName())) {
			userRequestModel.setFullName(null);
		}
		
	}
	
}
