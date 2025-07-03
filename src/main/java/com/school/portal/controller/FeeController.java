package com.school.portal.controller;

import com.school.portal.domain.FeePayment;
import com.school.portal.domain.MasterFee;
import com.school.portal.enums.FeeType;
import com.school.portal.service.FeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/master/class/{masterClassUuid}")
    public List<MasterFee> getFeesByClass(@PathVariable String masterClassUuid) {
        return feeService.findByMasterClassUuid(masterClassUuid);
    }

    @GetMapping("/master/class/{masterClassUuid}/type/{feeType}")
    public List<MasterFee> getFeesByClassAndType(
            @PathVariable String masterClassUuid,
            @PathVariable FeeType feeType) {
        return feeService.findByMasterClassUuidAndFeeType(masterClassUuid, feeType);
    }

    @GetMapping("/master/{masterFeesUuid}")
    public Optional<MasterFee> getMasterFeeById(@PathVariable String masterFeesUuid) {
        return feeService.getMasterFeeById(masterFeesUuid);
    }

    @PutMapping("/master/{masterFeesUuid}")
    public ResponseEntity<MasterFee> updateMasterFee(
            @PathVariable String masterFeesUuid,
            @RequestBody MasterFee updatedFee) {
        MasterFee updated = feeService.updateMasterFee(masterFeesUuid, updatedFee);
        return ResponseEntity.ok(updated);
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

    @GetMapping("/payment/student/{userUuid}")
    public List<FeePayment> getPaymentsByStudent(@PathVariable String userUuid) {
        return feeService.getPaymentsByUserUuid(userUuid);
    }

    @PutMapping("/payment/{feePaymentUuid}")
    public ResponseEntity<FeePayment> updatePayment(
            @PathVariable String feePaymentUuid,
            @RequestBody FeePayment updatedPayment) {
        FeePayment payment = feeService.updateFeePayment(feePaymentUuid, updatedPayment);
        return ResponseEntity.ok(payment);
    }

}
