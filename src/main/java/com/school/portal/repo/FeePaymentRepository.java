package com.school.portal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.school.portal.domain.FeePayment;
import com.school.portal.dto.FeePaymentResponseDTO;

public interface FeePaymentRepository extends JpaRepository<FeePayment, Long> {
	
	@Query("SELECT new com.school.portal.dto.FeePaymentResponseDTO(" +
	           "u.rollNumber, u.fullName, u.userUuid, " +
	           "fp.feePaymentUuid, fp.amountPaid, fp.discountAmount, fp.paymentDate, fp.paymentMode, fp.transactionId, fp.remarks, " +
	           "mf.masterFeesUuid, mf.academicYear, mf.totalFee, mf.feeType, mf.feeName, mc.className, ms.sectionName, fp.month, fp.year) " +
	           "FROM FeePayment fp " +
	           "JOIN fp.user u " +
	           "JOIN fp.masterFee mf " +
	           "JOIN u.masterClass mc " +
	           "JOIN u.masterSection ms " +
	           "WHERE u.userUuid = :userUuid")
	    List<FeePaymentResponseDTO> findAllPaymentsByUserUuid(@Param("userUuid") String userUuid);
	
	@Query("SELECT new com.school.portal.dto.FeePaymentResponseDTO(" +
		       "u.rollNumber, u.fullName, u.userUuid, " +
		       "fp.feePaymentUuid, fp.amountPaid, fp.discountAmount, fp.paymentDate, fp.paymentMode, fp.transactionId, fp.remarks, " +
		       "mf.masterFeesUuid, mf.academicYear, mf.totalFee, mf.feeType, mf.feeName, " +
		       "mc.className, ms.sectionName, fp.month, fp.year) " +
		       "FROM FeePayment fp " +
		       "JOIN fp.user u " +
		       "JOIN fp.masterFee mf " +
		       "JOIN u.masterClass mc " +
		       "LEFT JOIN u.masterSection ms " +
		       "WHERE mc.masterClassUuid = :classUuid " +
		       "AND (:sectionUuid IS NULL OR ms.masterSectionUuid = :sectionUuid)")
		List<FeePaymentResponseDTO> findAllPaymentsByClassUuidAndSectionUuid(@Param("classUuid") String classUuid,
		                                                                    @Param("sectionUuid") String sectionUuid);

	FeePayment findByFeePaymentUuid(String feePaymentUuid);

	
	
	@Query("SELECT new com.school.portal.dto.FeePaymentResponseDTO(" +
		       "u.rollNumber, u.fullName, u.userUuid, " +
		       "fp.feePaymentUuid, fp.amountPaid, fp.discountAmount, fp.paymentDate, fp.paymentMode, fp.transactionId, fp.remarks, " +
		       "mf.masterFeesUuid, mf.academicYear, mf.totalFee, mf.feeType, mf.feeName, " +
		       "mc.className, ms.sectionName, fp.month, fp.year) " +
		       "FROM FeePayment fp " +
		       "JOIN fp.user u " +
		       "JOIN fp.masterFee mf " +
		       "JOIN u.masterClass mc " +
		       "LEFT JOIN u.masterSection ms " +
		       "WHERE fp.feePaymentUuid = :feePaymentUuid ")
	FeePaymentResponseDTO getSinglePayment(@Param("feePaymentUuid") String feePaymentUuid);
	
	
	@Query("SELECT new com.school.portal.dto.FeePaymentResponseDTO(" +
		       "u.rollNumber, u.fullName, u.userUuid, " +
		       "fp.feePaymentUuid, fp.amountPaid, fp.discountAmount, fp.paymentDate, fp.paymentMode, fp.transactionId, fp.remarks, " +
		       "mf.masterFeesUuid, mf.academicYear, mf.totalFee, mf.feeType, mf.feeName, " +
		       "mc.className, ms.sectionName, fp.month, fp.year) " +
		       "FROM FeePayment fp " +
		       "JOIN fp.user u " +
		       "JOIN fp.masterFee mf " +
		       "JOIN u.masterClass mc " +
		       "LEFT JOIN u.masterSection ms ")
	List<FeePaymentResponseDTO> getAllPayments();

   
}
//
