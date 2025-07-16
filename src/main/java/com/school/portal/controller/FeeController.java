package com.school.portal.controller;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.school.portal.dto.FeeDto;
import com.school.portal.dto.FeePaymentRequestDto;
import com.school.portal.dto.FeePaymentResponseDTO;
import com.school.portal.dto.FeePaymentUpdateDto;
import com.school.portal.dto.MasterFeeRequestDTO;
import com.school.portal.dto.UpdateMasterFeeRequestDTO;
import com.school.portal.enums.FeeName;
import com.school.portal.enums.FeeType;
import com.school.portal.service.FeeService;

@RestController
@RequestMapping("/api/v1/fees")
public class FeeController {

    @Autowired
    private FeeService feeService;
    
    @PostMapping("/master-fee")
    public ResponseEntity<Object> createMasterFee(@RequestBody MasterFeeRequestDTO dto) {
        try {
        	if (isValidFeeCombination(dto.getFeeType(), dto.getFeeName())) {
        		  String masterFeeUuid = feeService.createMasterFee(dto);
                  Map<String, String> map = new HashMap<>();
                  map.put("masterFeeUuid", masterFeeUuid);
                  return ResponseEntity.ok(map);
        	}
          
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.badRequest().build();
    }
    
    @GetMapping("/master-fee/{masterFeeUuid}")
    public ResponseEntity<Object> getMasterFeesByMasteruuid(@PathVariable String masterFeeUuid) {
        FeeDto fee = feeService.getMasterFeesByMasteruuid(masterFeeUuid);
        return ResponseEntity.ok(fee);
    }
    
    @GetMapping("/master-fee")
    public ResponseEntity<Object> getAllMasterFees() {
        List<FeeDto> fees = feeService.getAllMasterFees();
        return ResponseEntity.ok(fees);
    }
    
    @GetMapping("/master-fee/class/{classUuid}/feeType/{feeType}")
    public ResponseEntity<Object> getMasterFeesByClassUuidAndFeeType(@PathVariable String classUuid, @PathVariable FeeType feeType) {
        List<FeeDto> fees = feeService.getMasterFeesByClassUuidAndFeeType(classUuid, feeType);
        return ResponseEntity.ok(fees);
    }
    
    @PutMapping("/master-fee/{masterFeeUuid}")
    public ResponseEntity<Object> updateMasterFee(@PathVariable String masterFeeUuid, 
    		@RequestBody UpdateMasterFeeRequestDTO updateFeeDto) {
        try {
            feeService.updateMasterFee(masterFeeUuid, updateFeeDto);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @PostMapping("/payments")
    public ResponseEntity<Object> createPayment(@RequestBody FeePaymentRequestDto dto) {
    	if(isValidFeeCombination(dto.getFeeType(), dto.getFeeName())) {
    		String feePaymentUuid = feeService.createPayment(dto);
    		  Map<String, String> map = new HashMap<>();
              map.put("feePaymentUuid", feePaymentUuid);
              return ResponseEntity.ok(map);
    	}
        
        return ResponseEntity.badRequest().build();
    }
    
    @GetMapping("/payments/{feePaymentUuid}")
    public ResponseEntity<Object> getSinglePayment(@PathVariable String feePaymentUuid) {
    	FeePaymentResponseDTO feePaymentResponseDTO = feeService.getSinglePayment(feePaymentUuid);
        return ResponseEntity.ok(feePaymentResponseDTO);
    }
    
    @PutMapping("/payments/{feePaymentUuid}")
    public ResponseEntity<Object> updatePayment(@PathVariable String feePaymentUuid, 
    		@RequestBody FeePaymentUpdateDto updateDto) {
    	feeService.updatePayment(feePaymentUuid, updateDto);
        return ResponseEntity.ok().build();
    }
    
    
    @GetMapping("/payments/all")
    public ResponseEntity<Object> getAllPayments() {
        List<FeePaymentResponseDTO> response = feeService.getAllPayments();
        if (response.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/payments/user")
    public ResponseEntity<Object> getPaymentDetailsByUserUuid(@RequestParam String userUuid) {
        List<FeePaymentResponseDTO> response = feeService.getPaymentsByUserUuid(userUuid);
        if (response.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/payments/class-section")
    public ResponseEntity<Object> getPaymentsByClassUuidAndSectionuuid(@RequestParam String classUuid,
    		@RequestParam(required = false) String sectionUuid) {
        List<FeePaymentResponseDTO> response = feeService.getPaymentsByClassUuidAndSectionuuid(classUuid, sectionUuid);
        if (response.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(response);
    }
    
    public static boolean isValidFeeCombination(FeeType feeType, FeeName feeName) {
        if (feeType == null || feeName == null) {
            return false; 
        }
        switch (feeType) {
            case ONE_TIME:
                return EnumSet.of(FeeName.ANNUAL, FeeName.REGISTRATION, FeeName.DRESS).contains(feeName);
            case MONTHLY:
                return EnumSet.of(FeeName.TUITION, FeeName.FOOD, FeeName.TRANSPORT).contains(feeName);
            case ADVANCE:
                return true; // no validation for ADVANCE
            default:
                return false;
        }
    }

}
