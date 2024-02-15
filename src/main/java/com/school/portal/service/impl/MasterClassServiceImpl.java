package com.school.portal.service.impl;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.portal.domain.MasterClass;
import com.school.portal.domain.MasterSection;
import com.school.portal.domain.User;
import com.school.portal.repo.MasterClassRepo;
import com.school.portal.repo.MasterSectionRepo;
import com.school.portal.repo.UserRepo;
import com.school.portal.requests.AssignClassSectionStudentModel;
import com.school.portal.requests.CreateMasterClassModel;
import com.school.portal.requests.CreateMasterSectionsModel;
import com.school.portal.requests.LinkClassSectionModel;
import com.school.portal.service.MasterClassService;
import com.school.portal.utils.SchoolPortalUtils;

@Service
public class MasterClassServiceImpl implements MasterClassService {

	@Autowired
	private MasterClassRepo masterClassRepo;
	
	@Autowired
	private MasterSectionRepo masterSectionRepo;
	
	@Autowired
	private UserRepo userRepo;

	@Override
	public String createMasterClass(CreateMasterClassModel createMasterClassModel) {
		MasterClass masterClass = masterClassRepo.findByClassName(createMasterClassModel.getClassName());
		if (masterClass == null) {
			masterClass = new MasterClass();
			masterClass.setClassName(createMasterClassModel.getClassName());
			masterClass.setMasterClassUuid(SchoolPortalUtils.getUniqueUuid());
			masterClass = masterClassRepo.save(masterClass);
			return masterClass.getMasterClassUuid();
		}
		return null;
	}

	@Override
	public String createMasterSection(CreateMasterSectionsModel createMasterSectionsModel) {
		MasterSection section = masterSectionRepo.findBySectionName(createMasterSectionsModel.getSectionName());		
		if (section == null) {
			section = new MasterSection();
			section.setSectionName(createMasterSectionsModel.getSectionName());
			section.setMasterSectionUuid(SchoolPortalUtils.getUniqueUuid());
			section = masterSectionRepo.save(section);
			return section.getMasterSectionUuid();
		}
		return null;
	}

	@Override
	public Boolean linkClassSections(LinkClassSectionModel linkClassSectionModel) {
		MasterClass classMaster = masterClassRepo.findByMasterClassUuid(linkClassSectionModel.getClassUuid());
		if (classMaster != null) {
			List<MasterSection> masterSections = masterSectionRepo.findByMasterSectionUuidIn(linkClassSectionModel.getSectionUuids());
			if (masterSections != null && masterSections.size() == linkClassSectionModel.getSectionUuids().size()) {
				classMaster.setMasterSection(new HashSet<>(masterSections));
				masterClassRepo.save(classMaster);
				return true;
			}
		}
		return false;
	}

	@Override
	public List<MasterClass> getMasterClasses() {
		return masterClassRepo.findByIsActive(true);
	}

	@Override
	public List<MasterSection> getMasterSections() {
		return masterSectionRepo.findByIsActive(true);
	}

	@Override
	public List<MasterClass> getLinkedClassSections() {
		return getMasterClasses();
	}

	@Override
	public Boolean assignClassSectionToStudent(String userUuid, AssignClassSectionStudentModel assignClassSectionStudentModel) {
		MasterSection masterSection = masterSectionRepo.findByMasterSectionUuid(assignClassSectionStudentModel.getSectionUuid());
		if (masterSection != null) {
			MasterClass masterClass = masterClassRepo.findByMasterClassUuid(assignClassSectionStudentModel.getClassUuid());
			if (masterClass != null) {
				User user = userRepo.findByUserUuidAndIsActive(userUuid, true);
				if (user != null) {
					user.setMasterClass(masterClass);
					user.setMasterSection(masterSection);
					userRepo.save(user);
					return true;
				}
			}
		}
		return false;
	}

}
