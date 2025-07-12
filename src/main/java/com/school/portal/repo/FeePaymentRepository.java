package com.school.portal.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.school.portal.domain.FeePayment;
import com.school.portal.dto.FeePaymentDto;

public interface FeePaymentRepository extends JpaRepository<FeePayment, Long> {
    List<FeePayment> findByUserUuid(String userUuid);

    Optional<FeePayment> findByFeePaymentUuid(String feePaymentUuid);
    
    @Query("SELECT new com.school.portal.dto.FeePaymentDto(" +
            "fp.userUuid, u.fullName, u.username, ui.fatherName, u.rollNumber, u.enrollmentNumber, " +
            "fp.feePaymentUuid, mf.masterClassUuid, mc.className, " +
            "fp.masterSectionUuid, ms.sectionName, " +
            "fp.amountPaid, fp.paymentDate, fp.paymentMode, " +
            "fp.transactionId, fp.remarks, fp.createdAt, fp.updatedAt) " +
            "FROM FeePayment fp " +
            "JOIN User u ON u.userUuid = fp.userUuid " +
            "JOIN MasterFee mf ON mf = fp.masterFee " +
            "JOIN MasterClass mc ON mc.masterClassUuid = mf.masterClassUuid " +
            "LEFT JOIN UserInfo ui ON u.userId = ui.user " +
            "JOIN MasterSection ms ON ms.masterSectionUuid = fp.masterSectionUuid")
    List<FeePaymentDto> findAllFeePaymentsAsDto();
}
//
