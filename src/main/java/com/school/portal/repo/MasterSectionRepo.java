package com.school.portal.repo;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school.portal.domain.MasterSection;
import com.school.portal.enums.AcademicYear;

public interface MasterSectionRepo extends JpaRepository<MasterSection, Long> {
	MasterSection findBySectionNameAndAcademicYear(String sectionName, AcademicYear academicYear);

	List<MasterSection> findByMasterSectionUuidInAndAcademicYear(Set<String> sectionUuids, AcademicYear academicYear);

	List<MasterSection> findByIsActiveAndAcademicYear(boolean isActive, AcademicYear academicYear);

	MasterSection findByMasterSectionUuid(String sectionUuid);
}
