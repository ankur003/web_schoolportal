package com.school.portal.service;

import java.util.List;

import com.school.portal.domain.MasterClass;
import com.school.portal.domain.MasterSection;
import com.school.portal.requests.AssignClassSectionStudentModel;
import com.school.portal.requests.CreateMasterClassModel;
import com.school.portal.requests.CreateMasterSectionsModel;
import com.school.portal.requests.LinkClassSectionModel;

public interface MasterClassService {

	String createMasterClass(CreateMasterClassModel createMasterClassModel);

	String createMasterSection(CreateMasterSectionsModel createMasterSectionsModel);

	void linkClassSections(LinkClassSectionModel linkClassSectionModel);

	List<MasterClass> getMasterClasses();

	List<MasterSection> getMasterSections();

	List<MasterClass> getLinkedClassSections();

	void assignClassSectionToStudent(String userUuid, AssignClassSectionStudentModel assignClassSectionStudentModel);

}
