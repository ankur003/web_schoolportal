package com.school.portal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.school.portal.domain.MasterFee;
import com.school.portal.dto.FeeDto;
import com.school.portal.enums.FeeName;
import com.school.portal.enums.FeeType;

public interface MasterFeeRepository extends JpaRepository<MasterFee, Long> {
   
	MasterFee findByFeeTypeAndFeeNameAndMasterClassIdAndAcademicYear(FeeType feeType, FeeName feeName, Long masterClassId,
			String academicYear);
	
    
    @Query("SELECT new com.school.portal.dto.FeeDto(" +
            "mf.masterFeesUuid, mc.masterClassUuid, mc.className, " +
            "mf.feeType, mf.feeName, mf.totalFee, mf.academicYear, mf.createdAt, mf.updatedAt) " +
            "FROM MasterFee mf JOIN MasterClass mc ON mf.masterClassId = mc.masterClassId "
            + "where mf.academicYear = :academicYear")
     List<FeeDto> findAllMasterFees(@Param("academicYear") String academicYear);
    
    @Query("SELECT new com.school.portal.dto.FeeDto(" +
            "mf.masterFeesUuid, mc.masterClassUuid, mc.className, " +
            "mf.feeType, mf.feeName, mf.totalFee, mf.academicYear, mf.createdAt, mf.updatedAt) " +
            "FROM MasterFee mf JOIN MasterClass mc ON mf.masterClassId = mc.masterClassId " +
            "WHERE mf.masterFeesUuid = :masterFeesUuid AND mf.academicYear = :academicYear")
     FeeDto getMasterFeesByMasteruuid(@Param("masterFeesUuid") String masterFeesUuid, @Param("academicYear") String academicYear);


	MasterFee findByMasterFeesUuid(String masterFeeUuid);
	
	
    @Query("SELECT new com.school.portal.dto.FeeDto(" +
 	       "mf.masterFeesUuid, mc.masterClassUuid, mc.className, " +
 	       "mf.feeType, mf.feeName, mf.totalFee, mf.academicYear, mf.createdAt, mf.updatedAt) " +
 	       "FROM MasterFee mf " +
 	       "JOIN MasterClass mc ON mf.masterClassId = mc.masterClassId " +
 	       "WHERE mf.masterClassId = :masterClassId AND mf.academicYear = :academicYear ")
     List<FeeDto> findMasterFeesByClassId(@Param("masterClassId") Long masterClassId, @Param("academicYear") String academicYear);

    
    
    @Query("SELECT new com.school.portal.dto.FeeDto(" +
    	       "mf.masterFeesUuid, mc.masterClassUuid, mc.className, " +
    	       "mf.feeType, mf.feeName, mf.totalFee, mf.academicYear, mf.createdAt, mf.updatedAt) " +
    	       "FROM MasterFee mf " +
    	       "JOIN MasterClass mc ON mf.masterClassId = mc.masterClassId " +
    	       "WHERE mf.masterClassId = :masterClassId AND mf.feeType = :feeType AND mf.academicYear = :academicYear")
	List<FeeDto> findMasterFeesByClassIdAndFeeType(@Param("masterClassId") Long masterClassId, @Param("feeType") FeeType feeType,
			@Param("academicYear") String academicYear);


	 
}
