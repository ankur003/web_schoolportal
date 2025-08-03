package com.school.portal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.school.portal.domain.MasterClass;
import com.school.portal.domain.MasterSection;
import com.school.portal.domain.User;
import com.school.portal.domain.UserClassSection;
import com.school.portal.enums.AcademicYear;

public interface UserClassSectionRepository extends JpaRepository<UserClassSection, Long>, JpaSpecificationExecutor<UserClassSection> {


    @Query("SELECT ucs FROM UserClassSection ucs " +
           "WHERE ucs.user.userId IN :userIds AND ucs.isActive = true AND ucs.academicYear = :academicYear")
    List<UserClassSection> findActiveByUserIdsAndAcademicYear(@Param("userIds") List<Long> userIds, 
    		@Param("academicYear") AcademicYear academicYear);
    
    @Query("SELECT ucs FROM UserClassSection ucs " +
            "WHERE ucs.user.userId IN :userIds AND ucs.isActive = true"
            + " AND ucs.academicYear = :academicYear AND ucs.masterClass.className = :className "
            + " AND ucs.masterSection.sectionName = :sectionName")
     List<UserClassSection> findActiveByUserIdsAndAcademicYearAndClassNameAndSectionNme(@Param("userIds") List<Long> userIds, 
     		@Param("academicYear") AcademicYear academicYear,
     		@Param("className") String className,
     		@Param("sectionName") String sectionName);
    
    @Query("SELECT ucs FROM UserClassSection ucs " +
            "WHERE ucs.user.userId IN :userIds AND ucs.isActive = true"
            + " AND ucs.academicYear = :academicYear AND ucs.masterClass.className = :className ")
     List<UserClassSection> findActiveByUserIdsAndAcademicYearAndClassName(@Param("userIds") List<Long> userIds, 
     		@Param("academicYear") AcademicYear academicYear,
     		@Param("className") String className);

	UserClassSection findByUserAndAcademicYear(User user, AcademicYear academicYear);

	List<UserClassSection> findByMasterClassAndMasterSectionAndAcademicYear(MasterClass masterClass, MasterSection masterSection, AcademicYear academicYear);

	List<UserClassSection> findByMasterClassAndAcademicYear(MasterClass masterClass, AcademicYear academicYear);

}