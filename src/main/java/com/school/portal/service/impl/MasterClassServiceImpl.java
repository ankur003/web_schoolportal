package com.school.portal.service.impl;

import com.school.portal.domain.MasterClass;
import com.school.portal.domain.MasterSection;
import com.school.portal.domain.User;
import com.school.portal.domain.UserClassSection;
import com.school.portal.enums.AcademicYear;
import com.school.portal.repo.MasterClassRepo;
import com.school.portal.repo.MasterSectionRepo;
import com.school.portal.repo.UserClassSectionRepository;
import com.school.portal.repo.UserRepo;
import com.school.portal.requests.AssignClassSectionStudentModel;
import com.school.portal.requests.CreateMasterClassModel;
import com.school.portal.requests.CreateMasterSectionsModel;
import com.school.portal.requests.LinkClassSectionModel;
import com.school.portal.service.MasterClassService;
import com.school.portal.utils.LoggedInUserUtil;
import com.school.portal.utils.SchoolPortalUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class MasterClassServiceImpl implements MasterClassService {

	@Autowired
	private MasterClassRepo masterClassRepo;
	
	@Autowired
	private MasterSectionRepo masterSectionRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	
	@Autowired
	private UserClassSectionRepository userClassSectionRepository;


	@Override
	public String createMasterClass(CreateMasterClassModel createMasterClassModel) {
		MasterClass masterClass = masterClassRepo.findByClassNameAndAcademicYear(createMasterClassModel.getClassName(),
				LoggedInUserUtil.getLoginUserAcadmicYear());
		if (masterClass == null) {
			masterClass = new MasterClass();
			masterClass.setClassName(createMasterClassModel.getClassName());
			masterClass.setMasterClassUuid(SchoolPortalUtils.getUniqueUuid());
			masterClass.setUpdatedAt(LocalDateTime.now());
			masterClass.setCreatedAt(LocalDateTime.now());
			masterClass.setCreatedBy(LoggedInUserUtil.getLoggedInUserName());
			masterClass.setAcademicYear(LoggedInUserUtil.getLoginUserAcadmicYear());
			masterClass = masterClassRepo.save(masterClass);
			linkClassSections (LinkClassSectionModel.builder ().classUuid (masterClass.getMasterClassUuid())
					.sectionUuids (createMasterClassModel.getSectionUuids ()).build ());
			return masterClass.getMasterClassUuid();
		}
		return null;
	}

	@Override
	public String createMasterSection(CreateMasterSectionsModel createMasterSectionsModel) {
		MasterSection section = masterSectionRepo.findBySectionNameAndAcademicYear(createMasterSectionsModel.getSectionName(), LoggedInUserUtil.getLoginUserAcadmicYear());		
		if (section == null) {
			section = new MasterSection();
			section.setSectionName(createMasterSectionsModel.getSectionName());
			section.setMasterSectionUuid(SchoolPortalUtils.getUniqueUuid());
			section.setCreatedAt(LocalDateTime.now());
			section.setUpdatedAt(LocalDateTime.now());
			section.setCreatedBy(LoggedInUserUtil.getLoggedInUserName());
			section.setAcademicYear(LoggedInUserUtil.getLoginUserAcadmicYear());
			section = masterSectionRepo.save(section);
			return section.getMasterSectionUuid();
		}
		return null;
	}

	@Override
	public Boolean linkClassSections(LinkClassSectionModel linkClassSectionModel) {
	    MasterClass classMaster = masterClassRepo.findByMasterClassUuid(linkClassSectionModel.getClassUuid());
	    if (classMaster != null) {
	        List<MasterSection> masterSections = masterSectionRepo.findByMasterSectionUuidInAndAcademicYear(linkClassSectionModel.getSectionUuids(), LoggedInUserUtil.getLoginUserAcadmicYear());
	        if (masterSections != null && masterSections.size() == linkClassSectionModel.getSectionUuids().size()) {
	            Set<MasterSection> ms = classMaster.getMasterSection();
	            if (ms == null) {
	                ms = new HashSet<>();
	                classMaster.setMasterSection(ms);
	            }

	            for (MasterSection masterSection : masterSections) {
	                boolean found = false;
	                for (MasterSection mS : ms) {
	                    if (mS.getMasterSectionUuid().equals(masterSection.getMasterSectionUuid())) {
	                        found = true;
	                        break;
	                    }
	                }
	                if (!found) {
	                    ms.add(masterSection);
	                }
	            }

	            classMaster.setUpdatedAt(LocalDateTime.now());
	            classMaster.setAcademicYear(LoggedInUserUtil.getLoginUserAcadmicYear());
	            masterClassRepo.save(classMaster);
	            return true;
	        }
	    }
	    return false;
	}


	@Override
	public List<MasterClass> getMasterClasses() {
		return masterClassRepo.findByIsActiveAndAcademicYear(true, LoggedInUserUtil.getLoginUserAcadmicYear());
	}

	@Override
	public List<MasterSection> getMasterSections() {
		return masterSectionRepo.findByIsActiveAndAcademicYear(true, LoggedInUserUtil.getLoginUserAcadmicYear());
	}

	@Override
	public List<MasterClass> getLinkedClassSections() {
		return getMasterClasses();
	}

	@Override
	public Boolean assignClassSectionToStudent(String userUuid, AssignClassSectionStudentModel assignClassSectionStudentModel) {
		User user = userRepo.findByUserUuidAndIsActive(userUuid, true);
		if (user == null) {
			return Boolean.FALSE;
		}
		MasterSection masterSection = null;
		UserClassSection classSection = userClassSectionRepository.findByUserAndAcademicYear(user, LoggedInUserUtil.getLoginUserAcadmicYear());
		if (classSection == null) {
			classSection = new UserClassSection();
			classSection.setUserClassSectionUuid(SchoolPortalUtils.getUniqueUuid());
			classSection.setAcademicYear(LoggedInUserUtil.getLoginUserAcadmicYear());
			classSection.setIsActive(true);
		}
		
        if (StringUtils.isNotBlank(assignClassSectionStudentModel.getSectionUuid())) {
            masterSection = masterSectionRepo.findByMasterSectionUuid(assignClassSectionStudentModel.getSectionUuid());
            if (masterSection != null) {
                classSection.setMasterSection(masterSection);
                classSection.setAcademicYear(LoggedInUserUtil.getLoginUserAcadmicYear());
                user.setUpdatedAt(LocalDateTime.now());
            }
        }
        MasterClass masterClass = masterClassRepo.findByMasterClassUuid(assignClassSectionStudentModel.getClassUuid());
		if (masterClass != null) {
			classSection.setMasterClass(masterClass);
			classSection.setAcademicYear(LoggedInUserUtil.getLoginUserAcadmicYear());
			user.setUpdatedAt(LocalDateTime.now());
		}
		if (Objects.equals(user.getUserType(), "TEACHER")) {
			user.setIsClassTeacher(true);
		} else if (Objects.equals(user.getUserType(), "STUDENT")) { 
			assignRollNumberAndEnrollmentNumber(masterClass, masterSection, user);

		}
		classSection.setUser(user);
		classSection.setAcademicYear(LoggedInUserUtil.getLoginUserAcadmicYear());
		userRepo.save(user);
		userClassSectionRepository.save(classSection);
		return true;
	}

	private void assignRollNumberAndEnrollmentNumber(MasterClass masterClass, MasterSection masterSection, User user) {
		if (masterSection != null  && masterClass != null) {
			List<UserClassSection> users = userClassSectionRepository.findByMasterClassAndMasterSectionAndAcademicYear(masterClass, 
					masterSection, LoggedInUserUtil.getLoginUserAcadmicYear());
			user.setRollNumber(users.size() + 1L);
		} else if (masterClass != null) { 
			List<UserClassSection> users = userClassSectionRepository.findByMasterClassAndAcademicYear(masterClass, LoggedInUserUtil.getLoginUserAcadmicYear());
			user.setRollNumber(users.size() + 1L);
		}
		if (StringUtils.isBlank(user.getEnrollmentNumber())) {
			user.setEnrollmentNumber("ENROLL_" + LocalDateTime.now().getNano() + SchoolPortalUtils.getUnique5DigitInteger());
		}
	}
	
}
