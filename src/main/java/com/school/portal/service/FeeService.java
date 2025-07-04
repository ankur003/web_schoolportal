package com.school.portal.service;

import com.school.portal.domain.FeePayment;
import com.school.portal.domain.MasterClass;
import com.school.portal.domain.MasterFee;
import com.school.portal.domain.MasterSection;
import com.school.portal.dto.MasterFeeResponseDTO;
import com.school.portal.enums.FeeType;
import com.school.portal.repo.FeePaymentRepository;
import com.school.portal.repo.MasterFeeRepository;
import com.school.portal.utils.SchoolPortalUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<MasterFeeResponseDTO> getAllMasterFees() {
        return masterFeeRepository.findAll().stream()
                .map(fee -> {
                    MasterClass masterClass = fee.getMasterClass();

                    List<String> sectionNames = new ArrayList<>();
                    String className = null;

                    if (masterClass != null) {
                        className = masterClass.getClassName();

                        if (masterClass.getMasterSection() != null) {
                            sectionNames = masterClass.getMasterSection().stream()
                                    .map(MasterSection::getSectionName)
                                    .filter(Objects::nonNull)
                                    .collect(Collectors.toList());
                        }
                    }

                    return MasterFeeResponseDTO.builder()
                            .id(fee.getId())
                            .masterClassUuid(fee.getMasterClassUuid())
                            .className(className)
                            .sectionName(sectionNames)
                            .masterFeesUuid(fee.getMasterFeesUuid())
                            .feeType(fee.getFeeType())
                            .totalFee(fee.getTotalFee())
                            .academicYear(fee.getAcademicYear())
                            .createdAt(fee.getCreatedAt())
                            .build();
                })
                .collect(Collectors.toList());
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
        MasterFee masterFee = masterFeeRepository.findByMasterFeesUuid(feePayment.getMasterFee().getMasterFeesUuid())
                .orElseThrow(() -> new RuntimeException("MasterFee not found"));
        // Now set it in FeePayment
        feePayment.setMasterFee(masterFee);
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
        //existing.setMasterFee(updatedPayment.getMasterFee()); // Optional
        existing.setUpdatedAt(LocalDateTime.now());

        return feePaymentRepository.save(existing);
    }

}
