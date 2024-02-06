package com.school.portal.repo;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school.portal.domain.MasterSection;

public interface MasterSectionRepo extends JpaRepository<MasterSection, Long> {
	MasterSection findBySectionName(String sectionName);

	List<MasterSection> findByMasterSectionUuidIn(Set<String> sectionUuids);

	List<MasterSection> findByIsActive(boolean isActive);

	MasterSection findByMasterSectionUuid(String sectionUuid);
}
