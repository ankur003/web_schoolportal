package com.school.portal.service;

import com.school.portal.domain.FeePayment;
import com.school.portal.domain.MasterFee;
import com.school.portal.enums.FeeType;
import com.school.portal.repo.FeePaymentRepository;
import com.school.portal.repo.MasterFeeRepository;
import com.school.portal.utils.SchoolPortalUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FeeService {

    @Autowired
    private MasterFeeRepository masterFeeRepository;

    @Autowired
    private FeePaymentRepository feePaymentRepository;

    // MASTER FEES
    public MasterFee createMasterFee(MasterFee masterFee) {
        masterFee.setMasterFeesUuid (SchoolPortalUtils.getUniqueUuid ());
        return masterFeeRepository.save(masterFee);
    }

    @Transactional(readOnly = true)
    public List<MasterFee> getAllMasterFees() {
        return masterFeeRepository.findAll();
    }

    public List<MasterFee> findByMasterClassUuid(String classId) {
        return masterFeeRepository.findByMasterClassUuid(classId);
    }

    public List<MasterFee> findByMasterClassUuidAndFeeType(String classId, FeeType feeType) {
        return masterFeeRepository.findByMasterClassUuidAndFeeType(classId, feeType);
    }

    public Optional<MasterFee> getMasterFeeById(String masterFeesUuid) {
        return masterFeeRepository.findByMasterFeesUuid(masterFeesUuid);
    }

    public MasterFee updateMasterFee(String masterFeesUuid, MasterFee updatedData) {
        MasterFee existingFee = masterFeeRepository.findByMasterFeesUuid(masterFeesUuid)
                .orElseThrow(() -> new RuntimeException("MasterFee not found"));

        // Update allowed fields
        existingFee.setFeeType(updatedData.getFeeType());
        existingFee.setTotalFee(updatedData.getTotalFee());
        existingFee.setAcademicYear(updatedData.getAcademicYear());
        existingFee.setUpdatedAt(LocalDateTime.now());

        return masterFeeRepository.save(existingFee);
    }


    // FEE PAYMENT
    public FeePayment addFeePayment(FeePayment feePayment) {
        feePayment.setFeePaymentUuid (SchoolPortalUtils.getUniqueUuid ());
        return feePaymentRepository.save(feePayment);
    }

    public List<FeePayment> getPaymentsByUserUuid(String userUuid) {
        return feePaymentRepository.findByUserUuid(userUuid);
    }

    public List<FeePayment> getAllPayments() {
        return feePaymentRepository.findAll();
    }

    public FeePayment updateFeePayment(String feePaymentUuid, FeePayment updatedPayment) {
        FeePayment existing = feePaymentRepository.findByFeePaymentUuid(feePaymentUuid)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        existing.setAmountPaid(updatedPayment.getAmountPaid());
        existing.setPaymentDate(updatedPayment.getPaymentDate());
        existing.setPaymentMode(updatedPayment.getPaymentMode());
        existing.setTransactionId(updatedPayment.getTransactionId());
        existing.setRemarks(updatedPayment.getRemarks());
        existing.setMasterFee(updatedPayment.getMasterFee()); // Optional
        existing.setUpdatedAt(LocalDateTime.now());

        return feePaymentRepository.save(existing);
    }

}
