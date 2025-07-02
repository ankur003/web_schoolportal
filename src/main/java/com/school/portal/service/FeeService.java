package com.school.portal.service;

import com.school.portal.domain.FeePayment;
import com.school.portal.domain.MasterFee;
import com.school.portal.enums.FeeType;
import com.school.portal.repo.FeePaymentRepository;
import com.school.portal.repo.MasterFeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
        return masterFeeRepository.save(masterFee);
    }

    public List<MasterFee> getAllMasterFees() {
        return masterFeeRepository.findAll();
    }

    public List<MasterFee> getFeesByClassId(Long classId) {
        return masterFeeRepository.findByClassId(classId);
    }

    public List<MasterFee> getFeesByClassAndType(Long classId, FeeType feeType) {
        return masterFeeRepository.findByClassIdAndFeeType(classId, feeType);
    }

    public Optional<MasterFee> getMasterFeeById(Long id) {
        return masterFeeRepository.findById(id);
    }

    // FEE PAYMENT
    public FeePayment addFeePayment(FeePayment feePayment) {
        return feePaymentRepository.save(feePayment);
    }

    public List<FeePayment> getPaymentsByStudentId(Long studentId) {
        return feePaymentRepository.findByStudentId(studentId);
    }

    public List<FeePayment> getAllPayments() {
        return feePaymentRepository.findAll();
    }
}
