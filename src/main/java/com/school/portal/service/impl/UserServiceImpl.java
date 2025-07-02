package com.school.portal.service.impl;

import com.school.portal.domain.*;
import com.school.portal.dto.LoginUser;
import com.school.portal.enums.ApprovalStatus;
import com.school.portal.enums.AttendanceStatus;
import com.school.portal.enums.SearchOperation;
import com.school.portal.enums.UserType;
import com.school.portal.exception.AlreadyExistsException;
import com.school.portal.facade.AuthenticationFacade;
import com.school.portal.queryfilter.GenericSpesification;
import com.school.portal.queryfilter.SearchCriteria;
import com.school.portal.repo.*;
import com.school.portal.requests.*;
import com.school.portal.response.UserAttendanceModel;
import com.school.portal.response.UserResponseModel;
import com.school.portal.service.*;
import com.school.portal.specification.AttendanceSpec;
import com.school.portal.utils.FileService;
import com.school.portal.utils.SchoolPortalUtils;
import lombok.RequiredArgsConstructor;
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

import javax.transaction.Transactional;
import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

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

    private final AttendanceRepository attendanceRepository;

    private final AuthenticationFacade authenticationFacade;

    private final ModelMapper modelMapper;

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
                boolean isLinked = linkStudentToClassSection (user, createUserModel);
                if (!isLinked) {
                    return null;
                }
                if (createUserModel.getUserType ().name ().equalsIgnoreCase(UserType.STUDENT.name())) {
                	generateAndSetRollNumberAndEnrollmentNumber(user);
                }
                user = userRepo.save (user);
                sendPasswordOnMail (user, tempPassword);
                return user.getUserUuid ();
            }
        }
        return null;
    }

    private void generateAndSetRollNumberAndEnrollmentNumber(User user) {
		if (user.getMasterSection() == null) {
			user.setRollNumber(masterClassRepo.count() + 1);
		} else {
			user.setRollNumber(masterSectionRepo.count() + 1);
		}
    	user.setEnrollmentNumber("ENROLL_" + SchoolPortalUtils.getUnique5DigitInteger());
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
    public Boolean markAttendance(User user) {
        boolean isExist = attendanceRepository.existsByUserAndAttendanceDate (user, LocalDate.now ());
        if (isExist)
            throw new AlreadyExistsException ("Attendance already marked for this date");
        Attendance attendance = Attendance.builder ().attendanceDate (LocalDate.now ())
                .user (user).status (AttendanceStatus.PRESENT)
                .approvalStatus (ApprovalStatus.PENDING)
                .markedAt (LocalDateTime.now ()).build ();
        attendanceRepository.save (attendance);
        return true;
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
                    .status (attendance.getApprovalStatus ())
                    .build ();
        }).collect (Collectors.toList ());
    }

    @Override
    @Transactional
    public Boolean updateAttendance(String userUuid, ApprovalStatus status, LocalDate date) {
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
            attendanceRepository.save (attendance);
            return true;
        }
        return false;
    }
}
