package com.school.portal.controller;

import com.school.portal.domain.FeePayment;
import com.school.portal.domain.MasterFee;
import com.school.portal.enums.FeeType;
import com.school.portal.service.FeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/fees")
public class FeeController {

    @Autowired
    private FeeService feeService;

    // ----------- MASTER FEES -------------

    @PostMapping("/master")
    public MasterFee createMasterFee(@RequestBody MasterFee masterFee) {
        return feeService.createMasterFee(masterFee);
    }

    @GetMapping("/master")
    public List<MasterFee> getAllMasterFees() {
        return feeService.getAllMasterFees();
    }

    @GetMapping("/master/class/{classId}")
    public List<MasterFee> getFeesByClass(@PathVariable Long classId) {
        return feeService.getFeesByClassId(classId);
    }

    @GetMapping("/master/class/{classId}/type/{feeType}")
    public List<MasterFee> getFeesByClassAndType(
            @PathVariable Long classId,
            @PathVariable FeeType feeType) {
        return feeService.getFeesByClassAndType(classId, feeType);
    }

    @GetMapping("/master/{id}")
    public Optional<MasterFee> getMasterFeeById(@PathVariable Long id) {
        return feeService.getMasterFeeById(id);
    }

    // ----------- FEE PAYMENTS -------------

    @PostMapping("/payment")
    public FeePayment addFeePayment(@RequestBody FeePayment feePayment) {
        return feeService.addFeePayment(feePayment);
    }

    @GetMapping("/payment")
    public List<FeePayment> getAllPayments() {
        return feeService.getAllPayments();
    }

    @GetMapping("/payment/student/{studentId}")
    public List<FeePayment> getPaymentsByStudent(@PathVariable Long studentId) {
        return feeService.getPaymentsByStudentId(studentId);
    }
}
