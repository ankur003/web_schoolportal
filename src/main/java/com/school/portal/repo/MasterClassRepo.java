package com.school.portal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school.portal.domain.MasterClass;

public interface MasterClassRepo extends JpaRepository<MasterClass, Long> {

	MasterClass findByClassName(String className);
	
	MasterClass findByMasterClassUuid(String classUuid);

	List<MasterClass> findByIsActive(boolean isActive);
}
