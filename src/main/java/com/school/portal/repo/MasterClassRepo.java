package com.school.portal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school.portal.domain.MasterClass;
import com.school.portal.enums.AcademicYear;

public interface MasterClassRepo extends JpaRepository<MasterClass, Long> {

	MasterClass findByClassNameAndAcademicYear(String className, AcademicYear academicYear);
	
	MasterClass findByMasterClassUuid(String classUuid);

	List<MasterClass> findByIsActiveAndAcademicYear(boolean isActive, AcademicYear academicYear);
}
