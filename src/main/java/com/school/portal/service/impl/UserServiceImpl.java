package com.school.portal.service.impl;

import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.school.portal.domain.*;
import com.school.portal.repo.*;
import com.school.portal.response.*;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.school.portal.dto.LoginUser;
import com.school.portal.enums.ApprovalStatus;
import com.school.portal.enums.AttendanceStatus;
import com.school.portal.enums.SearchOperation;
import com.school.portal.enums.UserType;
import com.school.portal.exception.AlreadyExistsException;
import com.school.portal.facade.AuthenticationFacade;
import com.school.portal.queryfilter.GenericSpesification;
import com.school.portal.queryfilter.SearchCriteria;
import com.school.portal.requests.AttendanceRequest;
import com.school.portal.requests.ChangePasswordModel;
import com.school.portal.requests.CreateUserModel;
import com.school.portal.requests.UpdateUserModel;
import com.school.portal.requests.UserRequestModel;
import com.school.portal.service.EmailService;
import com.school.portal.service.StudentParentLinkService;
import com.school.portal.service.UserEducationService;
import com.school.portal.service.UserExperienceService;
import com.school.portal.service.UserInfoService;
import com.school.portal.service.UserService;
import com.school.portal.specification.AttendanceSpec;
import com.school.portal.utils.FileService;
import com.school.portal.utils.SchoolPortalUtils;
import com.school.portal.utils.WhatsAppUtil;

import lombok.RequiredArgsConstructor;

@Service(value = "userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService, UserService {

    private final UserRepo userRepo;

    private final RoleRepo roleRepo;

    private final OtpRepo otpRepo;

    private final EmailService emailService;

    private final BCryptPasswordEncoder encoder;

    private final MasterClassRepo masterClassRepo;

    private final MasterSectionRepo masterSectionRepo;

    private final AddressRepo addressRepo;

    private final UserEducationService userEducationService;

    private final UserExperienceService userExperienceService;

    private final UserInfoService userInfoService;
    
    private final StudentParentLinkService parentLinkService;

    private final AttendanceRepository attendanceRepository;

    private final AuthenticationFacade authenticationFacade;

    private final ModelMapper modelMapper;

    private final HolidaysRepo holidaysRepository;

    public UserDetails loadUserByUsername(String username) {
        User user = userRepo.findByUsernameAndIsActive (username, true);
        if (user == null) {
            throw new UsernameNotFoundException ("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User (user.getUsername (), user.getPassword (),
                getAuthority (user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<> ();
        user.getRoles ().forEach (role ->
                authorities.add (new SimpleGrantedAuthority ("ROLE_" + role.getName ()))
        );
        return authorities;
    }

    @Override
    public User checkCredentials(LoginUser loginUser) {
        User user = userRepo.findByUsernameAndIsActive (loginUser.getUsername (), true);
        if (Objects.isNull (user)) {
            return null;
        }
        boolean isValid = encoder.matches (loginUser.getPassword (), user.getPassword ());
        if (isValid) {
            return user;
        }
        return null;
    }

    @Override
    public User getUser(String userEmail) {
        return userRepo.findByUsernameAndIsActive (userEmail, true);
    }

    @Override
    public String createUser(CreateUserModel createUserModel) {
        User user = userRepo.findByUsername (createUserModel.getUsername ());
        if (user == null) {
            user = new User ();
            user.setUsername (createUserModel.getUsername ());
            user.setFullName (createUserModel.getFullName ());
            String tempPassword = String.valueOf (SchoolPortalUtils.getUnique5DigitInteger ());
            user.setPassword (encoder.encode (tempPassword));
            user.setPhoneNo (createUserModel.getPhoneNo ());
            user.setUserType (createUserModel.getUserType ().name ());
            user.setDob (createUserModel.getDob ());
            user.setDoj (createUserModel.getDoj ());
            user.setUserUuid (SchoolPortalUtils.getUniqueUuid ());
            user.setCreatedAt (LocalDateTime.now ());
            user.setUpdatedAt (LocalDateTime.now ());
            Role role = roleRepo.findByName (createUserModel.getUserType ().name ());
            if (role != null) {
                Set<Role> roles = new HashSet<> ();
                roles.add (role);
                user.setRoles (roles);
                user.setUpdatedAt (LocalDateTime.now ());
                if (!createUserModel.getUserType ().equals(UserType.PARENT)) {
                	boolean isLinked = linkStudentToClassSection (user, createUserModel);
                	 if (!isLinked) {
                         return null;
                     }
                }
                user = userRepo.save (user);
                if (createUserModel.getUserType ().equals(UserType.PARENT)) {
                	linkageParentStudent(user, createUserModel);
                }
                sendPasswordOnMail (user, tempPassword);
                sendWhatsAppNotification(user, tempPassword);
                return user.getUserUuid ();
            }
        }
        return null;
    }

	private void sendWhatsAppNotification(User user, String tempPassword) {
		
		if (user.getPhoneNo() != null) {
			String msg = "Welcome to tech education world as " + user.getUserType().toUpperCase() +"."
					+ "\n Your username is " + user.getUsername() 
					+ "\n Your password is " + tempPassword + "\n";
			WhatsAppUtil.sendWhatsAppMessage(String.valueOf(user.getPhoneNo()), msg);
		}
	}

	private void linkageParentStudent(User user, CreateUserModel createUserModel) {
		Long parentId = user.getUserId();
		User student = userRepo.findByUserUuidAndIsActive(createUserModel.getUserUuid(), true);
		if (student != null) {
			Long studentId = student.getUserId();
			parentLinkService.linkParantToStudent(parentId, studentId);
		}
	}

	private boolean linkStudentToClassSection(User user, CreateUserModel createUserModel) {
        if (StringUtils.isBlank (createUserModel.getClassUuid ())) {
            return true;
        }
        MasterClass mastserClass = masterClassRepo.findByMasterClassUuid (createUserModel.getClassUuid ());
        if (mastserClass == null) {
            return false;
        }
        user.setMasterClass (mastserClass);
        if (StringUtils.isBlank (createUserModel.getSectionUuid ())) {
            return true;
        }
        if (mastserClass.getMasterSection () != null) {
            mastserClass.getMasterSection ().forEach (ms -> {
                if (createUserModel.getSectionUuid ().equals (ms.getMasterSectionUuid ())) {
                    user.setMasterSection (ms);
                }
            });
            return user.getMasterSection () != null;
        }
        return false;
    }

    private void sendPasswordOnMail(User user, String tempPassword) {
        Context context = new Context ();
        context.setVariable ("tempPass", tempPassword);
        emailService.sendOneTimePasswordOnUserCreation (user, "Temp Password | School Portal", "tempPassword", context);
    }

    @Override
    public User getUserDetail(String username) {
        return userRepo.findByUsernameAndIsActive (username, true);
    }

    @Override
    public User getUserDetailByUuid(String userUuid) {
        return userRepo.findByUserUuidAndIsActive (userUuid, true);
    }

    @Override
    public User checkUser(String username) {
        return userRepo.findByUsername (username);
    }

    @Override
    public Boolean resetPassword(User user, Otp otp, String password) {
        user.setPassword (encoder.encode (password));
        user.setUpdatedAt (LocalDateTime.now ());
        userRepo.save (user);
        otp.setIsUsed (true);
        otp.setUpdatedAt (LocalDateTime.now ());
        otpRepo.save (otp);
        return true;
    }

    @Override
    public Boolean changePassword(User user, ChangePasswordModel changePasswordModel) {
        Boolean isValid = encoder.matches (changePasswordModel.getOldPassword (), user.getPassword ());
        if (BooleanUtils.isTrue (isValid)) {
            user.setPassword (encoder.encode (changePasswordModel.getNewPassword ()));
            user.setUpdatedAt (LocalDateTime.now ());
            userRepo.save (user);
        }
        return isValid;
    }

    @Override
    public Page<User> getAllUsers(UserRequestModel userRequestModel) {
        GenericSpesification<User> genericSpesification = new GenericSpesification<> ();
        if (StringUtils.isNotBlank (userRequestModel.getFullName ())) {
            genericSpesification
                    .add (new SearchCriteria ("fullName", userRequestModel.getFullName (), SearchOperation.MATCH));
        }
        if (StringUtils.isNotBlank (userRequestModel.getUsername ())) {
            genericSpesification
                    .add (new SearchCriteria ("username", userRequestModel.getUsername (), SearchOperation.MATCH));
        }
        if (StringUtils.isNotBlank (userRequestModel.getUserType ())) {
            genericSpesification
                    .add (new SearchCriteria ("userType", userRequestModel.getUserType (), SearchOperation.EQUAL));
        }
        if (StringUtils.isNotBlank (userRequestModel.getClassName ())) {
            MasterClass masterClass = masterClassRepo.findByClassName (userRequestModel.getClassName ());
            genericSpesification
                    .add (new SearchCriteria ("masterClass", masterClass, SearchOperation.EQUAL));

        }
        if (StringUtils.isNotBlank (userRequestModel.getSectionName ())) {
            MasterSection section = masterSectionRepo.findBySectionName (userRequestModel.getSectionName ());
            genericSpesification
                    .add (new SearchCriteria ("masterSection", section, SearchOperation.EQUAL));
        }
        if (CollectionUtils.isNotEmpty (genericSpesification.getSearchCriteriaList ())) {
            return userRepo.findAll (genericSpesification,
                    PageRequest.of (userRequestModel.getPage () - 1, userRequestModel.getLimit (), Direction.DESC, "userId"));
        }
        return userRepo
                .findAll (PageRequest.of (userRequestModel.getPage () - 1, userRequestModel.getLimit (), Direction.DESC, "userId"));
    }

    @Override
    public Boolean saveFile(File file, User user) {
        return FileService.saveFile (file, user);
    }

    @Override
    public File downloadUserProfilePic(User user) {
        return FileService.getFile (user.getUserUuid ());
    }

    @Override
    public Address getAddress(User user) {
        return addressRepo.findByUser (user);
    }

    @Override
    public Boolean updateUserDetails(User user, UpdateUserModel updateUserModel) {
        if (StringUtils.isNotBlank (updateUserModel.getFullName ())) {
            user.setFullName (updateUserModel.getFullName ());
        }
        if (updateUserModel.getDob () != null) {
            user.setDob (updateUserModel.getDob ());
        }
        if (updateUserModel.getDoj () != null) {
            user.setDoj (updateUserModel.getDoj ());
        }
        if (updateUserModel.getIsActive () != null) {
            user.setIsActive (updateUserModel.getIsActive ());
        }
        if (updateUserModel.getPhoneNo () != null) {
            user.setPhoneNo (updateUserModel.getPhoneNo ());
        }
        User savedUser = userRepo.save (user);
        Address updatableAddress = updateUserModel.getAddress ();
        if (updatableAddress != null) {
            Address address = getAddress (savedUser);
            if (address == null) {
                address = new Address ();
                address.setAddressUuid (SchoolPortalUtils.getUniqueUuid ());
                address.setUser (user);
                address.setCreatedAt (LocalDateTime.now ());
            }
            updateAddress (address, updatableAddress);
        }
        if (updateUserModel.getUserEducations () != null) {
            userEducationService.saveOrUpdateUserEducations (savedUser, updateUserModel.getUserEducations ());
        }
        if (updateUserModel.getUserExperiences () != null) {
            userExperienceService.saveOrUpdateUserExperiences (savedUser, updateUserModel.getUserExperiences ());
        }
        if (updateUserModel.getUserInfo () != null) {
            userInfoService.saveorUpdateUserInfo (savedUser, updateUserModel.getUserInfo ());
        }
        return true;
    }

    private void updateAddress(Address address, Address updatableAddress) {
        if (StringUtils.isNotBlank (updatableAddress.getcBuildingName ())) {
            address.setcBuildingName (updatableAddress.getcBuildingName ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getcCoutry ())) {
            address.setcCoutry (updatableAddress.getcCoutry ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getcDistrict ())) {
            address.setcDistrict (updatableAddress.getcDistrict ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getcFlatNo ())) {
            address.setcFlatNo (updatableAddress.getcFlatNo ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getcFloorNo ())) {
            address.setcFloorNo (updatableAddress.getcFloorNo ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getcHouseNo ())) {
            address.setcHouseNo (updatableAddress.getcHouseNo ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getcPinCode ())) {
            address.setcPinCode (updatableAddress.getcPinCode ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getcState ())) {
            address.setcState (updatableAddress.getcState ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getcTehsil ())) {
            address.setcTehsil (updatableAddress.getcTehsil ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getcVillage ())) {
            address.setcVillage (updatableAddress.getcVillage ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getpBuildingName ())) {
            address.setpBuildingName (updatableAddress.getpBuildingName ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getpCoutry ())) {
            address.setpCoutry (updatableAddress.getpCoutry ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getpDistrict ())) {
            address.setpDistrict (updatableAddress.getpDistrict ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getpFlatNo ())) {
            address.setpFlatNo (updatableAddress.getpFlatNo ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getpFloorNo ())) {
            address.setpFloorNo (updatableAddress.getpFloorNo ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getpHouseNo ())) {
            address.setpHouseNo (updatableAddress.getpHouseNo ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getpPinCode ())) {
            address.setpPinCode (updatableAddress.getpPinCode ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getpState ())) {
            address.setpState (updatableAddress.getpState ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getpTehsil ())) {
            address.setpTehsil (updatableAddress.getpTehsil ());
        }
        if (StringUtils.isNotBlank (updatableAddress.getpVillage ())) {
            address.setpVillage (updatableAddress.getpVillage ());
        }

        address.setUpdatedAt (LocalDateTime.now ());
        addressRepo.save (address);
    }

    @Override
    public void markAttendance(User user, AttendanceStatus status, LocalDate date, String catagory) {
        if (date == null)
            date = LocalDate.now();
        if (status == null)
            status = AttendanceStatus.PRESENT;
        boolean isExist = attendanceRepository.existsByUserAndAttendanceDate(user, date);
        if (isExist)
            throw new AlreadyExistsException("Attendance already marked for this date");
        Attendance attendance = Attendance.builder().attendanceDate(date)
                .user(user).status(status)
                .approvalStatus(ApprovalStatus.PENDING)
                .catagory(catagory)
                .markedAt(LocalDateTime.now()).build();
        attendanceRepository.save(attendance);
    }

    @Override
    @Transactional
    public List<UserAttendanceModel> getUserAttendance(String userUuid, ApprovalStatus status, LocalDate date) {
        Specification<Attendance> attendanceSpecification = AttendanceSpec.getAttendanceSpecification (AttendanceRequest.builder ().userUuid (userUuid).status (status).date (date).build ());
        List<Attendance> userAttendance = attendanceRepository.findAll (attendanceSpecification);
        return userAttendance.stream ().map (attendance -> {
            return UserAttendanceModel.builder ()
                    .user (modelMapper.map (attendance.getUser (), UserResponseModel.class))
                    .date (attendance.getAttendanceDate ())
                    .approvalStatus(attendance.getApprovalStatus ())
                    .category(attendance.getCatagory())
                    .attendanceStatus(attendance.getStatus())
                    .build ();
        }).collect (Collectors.toList ());
    }

    @Override
    @Transactional
    public Boolean updateAttendance(String userUuid, ApprovalStatus status, LocalDate date,  String catagory) {
        Attendance attendance = attendanceRepository.findByUser_UserUuidAndAttendanceDate (userUuid, date).get ();
        User user = getUserDetail (authenticationFacade.getAuthentication ().getName ());
        if (attendance != null) {
            if (attendance.getApprovalStatus ().equals (ApprovalStatus.APPROVED))
                throw new RuntimeException ("Attendance is Approved can't change");
            if (attendance.getApprovalStatus ().equals (status))
                throw new RuntimeException ("Already at " + status.name () + "status");
            attendance.setApprovalStatus (status);
            attendance.setApprovedBy (user);
            attendance.setApprovedAt (LocalDateTime.now ());
            attendance.setUpdatedAt (LocalDateTime.now ());
            attendance.setCatagory(catagory);
            attendanceRepository.save (attendance);
            return true;
        }
        return false;
    }

    @Override
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public AttendanceMonthlyReportResponse getUserAttendanceForMonth(String userUuid, int year, int month) {
        // Validate month
        if (month < 1 || month > 12) {
            throw new IllegalArgumentException("Month must be between 1 and 12");
        }

        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        List<Attendance> attendanceList = attendanceRepository.findByUserIdAndDateRange(userUuid, startDate, endDate);

        // Fetch holidays for the month
        List<Holidays> holidaysList = holidaysRepository.findByDateRange(startDate, endDate);

        // Create a map for quick lookup of attendance records
        Map<LocalDate, Attendance> attendanceMap = attendanceList.stream()
                .collect(Collectors.toMap(Attendance::getAttendanceDate, attendance -> attendance));

        // Create a map for quick lookup of holidays
        Map<LocalDate, Holidays> holidaysMap = holidaysList.stream()
                .collect(Collectors.toMap(
                        holiday -> LocalDate.parse(holiday.getHolidayDate()),
                        holiday -> holiday
                ));

        // Generate calendar for the entire month
        List<AttendanceCalendarModel> calendar = new ArrayList<>();
        LocalDate currentDate = startDate;

        while (!currentDate.isAfter(endDate)) {
            AttendanceCalendarModel calendarEntry = createCalendarEntry(
                    currentDate,
                    attendanceMap.get(currentDate),
                    holidaysMap.get(currentDate)
            );
            calendar.add(calendarEntry);
            currentDate = currentDate.plusDays(1);
        }

        // Calculate summary statistics from actual attendance records
        AttendanceSummaryModel summary = calculateSummary(attendanceList, calendar);

        // Get user name (if attendance records exist)
        String userName = attendanceList.isEmpty() ? "Unknown User" :
                attendanceList.get(0).getUser().getFullName();

        return AttendanceMonthlyReportResponse.builder()
                .userUuid(userUuid)
                .userName(userName)
                .year(year)
                .month(month)
                .monthName(yearMonth.getMonth().toString())
                .totalDaysInMonth(yearMonth.lengthOfMonth())
                .totalWorkingDays(calculateWorkingDays(calendar))
                .totalHolidays(holidaysList.size())
                .summary(summary)
                .calendar(calendar)
                .build();
    }

    private AttendanceCalendarModel createCalendarEntry(LocalDate date, Attendance attendance, Holidays holiday) {
        boolean isWeekend = date.getDayOfWeek().getValue() >= 6; // Saturday = 6, Sunday = 7
        boolean isHoliday = holiday != null;
        String holidayName = isHoliday ? holiday.getHolidayName() : null;
        String holidayType = isHoliday ? holiday.getHolidayType() : null;

        if (attendance != null) {
            return AttendanceCalendarModel.builder()
                    .date(date)
                    .status(attendance.getStatus())
                    .markedAt(attendance.getMarkedAt())
                    .approvalStatus(attendance.getApprovalStatus())
                    .approvedByName(attendance.getApprovedBy() != null ?
                            attendance.getApprovedBy().getFullName() : null)
                    .approvedAt(attendance.getApprovedAt())
                    .remarks(attendance.getRemarks())
                    .isWeekend(isWeekend)
                    .isHoliday(isHoliday)
                    .holidayName(holidayName)
                    .holidayType(holidayType)
                    .build();
        } else {
            // No attendance record for this date
            return AttendanceCalendarModel.builder()
                    .date(date)
                    .status(null)
                    .markedAt(null)
                    .approvalStatus(null)
                    .approvedByName(null)
                    .approvedAt(null)
                    .remarks(null)
                    .isWeekend(isWeekend)
                    .isHoliday(isHoliday)
                    .holidayName(holidayName)
                    .holidayType(holidayType)
                    .build();
        }
    }

    private AttendanceSummaryModel calculateSummary(List<Attendance> attendanceList, List<AttendanceCalendarModel> calendar) {
        if (attendanceList.isEmpty()) {
            return AttendanceSummaryModel.builder()
                    .presentDays(0)
                    .absentDays(0)
                    .lateDays(0)
                    .halfDays(0)
                    .sickLeaveDays(0)
                    .casualLeaveDays(0)
                    .totalWorkingDays(calculateWorkingDays(calendar))
                    .totalHolidays((int) calendar.stream().filter(AttendanceCalendarModel::isHoliday).count())
                    .totalWeekends((int) calendar.stream().filter(AttendanceCalendarModel::isWeekend).count())
                    .attendancePercentage(0.0)
                    .build();
        }

        int presentDays = (int) attendanceList.stream()
                .filter(a -> a.getStatus() == AttendanceStatus.PRESENT)
                .count();
        int absentDays = (int) attendanceList.stream()
                .filter(a -> a.getStatus() == AttendanceStatus.ABSENT)
                .count();
        int lateDays = (int) attendanceList.stream()
                .filter(a -> a.getStatus() == AttendanceStatus.LATE)
                .count();
        int halfDays = (int) attendanceList.stream()
                .filter(a -> a.getStatus() == AttendanceStatus.HALF_DAY)
                .count();
        int sickLeaveDays = (int) attendanceList.stream()
                .filter(a -> a.getStatus() == AttendanceStatus.SICK_LEAVE)
                .count();
        int casualLeaveDays = (int) attendanceList.stream()
                .filter(a -> a.getStatus() == AttendanceStatus.CASUAL_LEAVE)
                .count();

        int totalWorkingDays = calculateWorkingDays(calendar);
        int totalHolidays = (int) calendar.stream().filter(AttendanceCalendarModel::isHoliday).count();
        int totalWeekends = (int) calendar.stream().filter(AttendanceCalendarModel::isWeekend).count();

        // Calculate attendance percentage based on working days only
        double attendanceScore = presentDays + lateDays + (halfDays * 0.5) + sickLeaveDays + casualLeaveDays;
        double attendancePercentage = totalWorkingDays > 0 ? (attendanceScore / totalWorkingDays) * 100 : 0.0;

        return AttendanceSummaryModel.builder()
                .presentDays(presentDays)
                .absentDays(absentDays)
                .lateDays(lateDays)
                .halfDays(halfDays)
                .sickLeaveDays(sickLeaveDays)
                .casualLeaveDays(casualLeaveDays)
                .totalWorkingDays(totalWorkingDays)
                .totalHolidays(totalHolidays)
                .totalWeekends(totalWeekends)
                .attendancePercentage(Math.round(attendancePercentage * 100.0) / 100.0)
                .build();
    }


    private int calculateWorkingDays(List<AttendanceCalendarModel> calendar) {
        return (int) calendar.stream()
                .filter(day -> !day.isWeekend() && !day.isHoliday())
                .count();
    }
}
