package com.school.portal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.school.portal.domain.FeePayment;
import com.school.portal.domain.User;
import com.school.portal.dto.FeePaymentResponseDTO;
import com.school.portal.enums.AcademicYear;

public interface FeePaymentRepository extends JpaRepository<FeePayment, Long> {
	
	@Query("SELECT new com.school.portal.dto.FeePaymentResponseDTO(" +
		       "u.rollNumber, u.fullName, u.userUuid, " +
		       "fp.feePaymentUuid, fp.amountPaid, fp.discountAmount, fp.paymentDate, fp.paymentMode, fp.transactionId, fp.remarks, " +
		       "mf.masterFeesUuid, mf.academicYear, mf.totalFee, mf.feeType, mf.feeName, " +
		       "mc.className, ms.sectionName, fp.month, fp.year, mc.masterClassUuid, ms.masterSectionUuid) " +
		       "FROM FeePayment fp " +
		       "JOIN fp.user u " +
		       "JOIN fp.masterFee mf " +
		       "JOIN UserClassSection ucs ON ucs.user = u AND ucs.isActive = true " +
		       "JOIN ucs.masterClass mc " +
		       "JOIN ucs.masterSection ms " +
		       "WHERE u.userUuid = :userUuid AND fp.academicYear = :academicYear ")
	List<FeePaymentResponseDTO> findAllPaymentsByUserUuid(@Param("userUuid") String userUuid, @Param("academicYear") AcademicYear academicYear);
	
	@Query("SELECT new com.school.portal.dto.FeePaymentResponseDTO(" +
		       "u.rollNumber, u.fullName, u.userUuid, " +
		       "fp.feePaymentUuid, fp.amountPaid, fp.discountAmount, fp.paymentDate, fp.paymentMode, fp.transactionId, fp.remarks, " +
		       "mf.masterFeesUuid, mf.academicYear, mf.totalFee, mf.feeType, mf.feeName, " +
		       "mc.className, ms.sectionName, fp.month, fp.year, mc.masterClassUuid, ms.masterSectionUuid) " +
		       "FROM FeePayment fp " +
		       "JOIN fp.user u " +
		       "JOIN fp.masterFee mf " +
		       "JOIN UserClassSection ucs ON ucs.user = u AND ucs.isActive = true " +
		       "JOIN ucs.masterClass mc " +
		       "LEFT JOIN ucs.masterSection ms " +
		       "WHERE (:classUuid IS NULL OR mc.masterClassUuid = :classUuid) " +
		       "AND (:sectionUuid IS NULL OR ms.masterSectionUuid = :sectionUuid) " +
		       "AND (:userUuid IS NULL OR u.userUuid = :userUuid) AND (fp.academicYear = :academicYear )")
		List<FeePaymentResponseDTO> findAllPaymentsByClassUuidAndSectionUuidAndUserUuid(
		    @Param("classUuid") String classUuid,
		    @Param("sectionUuid") String sectionUuid,
		    @Param("userUuid") String userUuid,
		    @Param("academicYear") AcademicYear academicYear
		);



	FeePayment findByFeePaymentUuidAndAcademicYear(String feePaymentUuid, AcademicYear academicYear);

	
	
	@Query("SELECT new com.school.portal.dto.FeePaymentResponseDTO(" +
		       "u.rollNumber, u.fullName, u.userUuid, " +
		       "fp.feePaymentUuid, fp.amountPaid, fp.discountAmount, fp.paymentDate, fp.paymentMode, fp.transactionId, fp.remarks, " +
		       "mf.masterFeesUuid, mf.academicYear, mf.totalFee, mf.feeType, mf.feeName, " +
		       "mc.className, ms.sectionName, fp.month, fp.year, mc.masterClassUuid, ms.masterSectionUuid) " +
		       "FROM FeePayment fp " +
		       "JOIN fp.user u " +
		       "JOIN fp.masterFee mf " +
		       "JOIN UserClassSection ucs ON ucs.user = u AND ucs.isActive = true " +
		       "JOIN ucs.masterClass mc " +
		       "LEFT JOIN ucs.masterSection ms " +
		       "WHERE fp.feePaymentUuid = :feePaymentUuid AND fp.academicYear = :academicYear")
	FeePaymentResponseDTO getSinglePayment(@Param("feePaymentUuid") String feePaymentUuid,
			@Param("academicYear") AcademicYear academicYear);
	
	
	@Query("SELECT new com.school.portal.dto.FeePaymentResponseDTO(" +
		       "u.rollNumber, u.fullName, u.userUuid, " +
		       "fp.feePaymentUuid, fp.amountPaid, fp.discountAmount, fp.paymentDate, fp.paymentMode, fp.transactionId, fp.remarks, " +
		       "mf.masterFeesUuid, mf.academicYear, mf.totalFee, mf.feeType, mf.feeName, " +
		       "mc.className, ms.sectionName, fp.month, fp.year, mc.masterClassUuid, ms.masterSectionUuid) " +
		       "FROM FeePayment fp " +
		       "JOIN fp.user u " +
		       "JOIN fp.masterFee mf " +
		       "JOIN UserClassSection ucs ON ucs.user = u AND ucs.isActive = true " +
		       "JOIN ucs.masterClass mc " +
		       "JOIN ucs.masterSection ms " +
		       "WHERE mf.academicYear = :academicYear")
		List<FeePaymentResponseDTO> getAllPayments(@Param("academicYear") AcademicYear academicYear);



	List<FeePayment> findByUserAndAcademicYear(User user, AcademicYear academicYear);

   
}
//
