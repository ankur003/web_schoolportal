package com.school.portal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.portal.domain.FeePayment;
import com.school.portal.domain.MasterClass;
import com.school.portal.domain.MasterFee;
import com.school.portal.domain.User;
import com.school.portal.dto.FeeDto;
import com.school.portal.dto.FeePaymentRequestDto;
import com.school.portal.dto.FeePaymentResponseDTO;
import com.school.portal.dto.FeePaymentUpdateDto;
import com.school.portal.dto.MasterFeeRequestDTO;
import com.school.portal.dto.UpdateMasterFeeRequestDTO;
import com.school.portal.repo.FeePaymentRepository;
import com.school.portal.repo.MasterClassRepo;
import com.school.portal.repo.MasterFeeRepository;
import com.school.portal.repo.UserRepo;
import com.school.portal.utils.SchoolPortalUtils;

@Service
public class FeeService {
	
	@Autowired
	FeePaymentRepository feePaymentRepository;
	
	@Autowired
	MasterFeeRepository masterFeeRepository;
	
	@Autowired
	MasterClassRepo masterClassRepository;
	
	@Autowired
	UserRepo userRepo;

	public List<FeePaymentResponseDTO> getPaymentsByUserUuid(String userUuid) {
        return feePaymentRepository.findAllPaymentsByUserUuid(userUuid);

	}
	
	public String createMasterFee(MasterFeeRequestDTO dto) {
        MasterClass masterClass = masterClassRepository.findByMasterClassUuid(dto.getMasterClassUuid());
        if (masterClass == null) {
        	return null;
        }
        MasterFee masterFee = masterFeeRepository.findByFeeTypeAndFeeName(dto.getFeeType(), dto.getFeeName());
        if (masterFee != null) {
        	return null;
        }
        masterFee = new MasterFee();
        masterFee.setMasterFeesUuid(SchoolPortalUtils.getUniqueUuid());
        masterFee.setMasterClassId(masterClass.getMasterClassId());
        masterFee.setFeeType(dto.getFeeType());
        masterFee.setFeeName(dto.getFeeName());
        masterFee.setTotalFee(dto.getTotalFee());
        masterFee.setAcademicYear(dto.getAcademicYear());

        return masterFeeRepository.save(masterFee).getMasterFeesUuid();
    }

	public List<FeePaymentResponseDTO> getPaymentsByClassUuidAndSectionuuid(String classUuid, String sectionUuid) {
		return feePaymentRepository.findAllPaymentsByClassUuidAndSectionUuid(classUuid, sectionUuid);
	}

	public void updateMasterFee(String masterFeeUuid, UpdateMasterFeeRequestDTO updateFeeDto) {
		
		MasterFee masterFee = masterFeeRepository.findByMasterFeesUuid(masterFeeUuid);
		
		if (masterFee != null) {
			masterFee.setTotalFee(updateFeeDto.getTotalFee());
			masterFeeRepository.save(masterFee);
		}
	}

	public List<FeeDto> getAllMasterFees() {
		return masterFeeRepository.findAllMasterFees();
	}

	public FeeDto getMasterFeesByMasteruuid(String masterFeeUuid) {
		return masterFeeRepository.getMasterFeesByMasteruuid(masterFeeUuid);
	}
	
	public String createPayment(FeePaymentRequestDto dto) {
        User user = userRepo.findByUserUuidAndIsActive(dto.getUserUuid(), true);
        
        if (user == null) {
        	return null;
        }

        MasterFee masterFee = masterFeeRepository.findByFeeTypeAndFeeName(dto.getFeeType(), dto.getFeeName());
        
        if (masterFee == null) {
        	return null;
        }

        FeePayment payment = new FeePayment();
        payment.setUser(user);
        payment.setMasterFee(masterFee);
        payment.setFeePaymentUuid(SchoolPortalUtils.getUniqueUuid());
        payment.setAmountPaid(dto.getAmountPaid());
        payment.setDiscountAmount(dto.getDiscountAmount());
        payment.setPaymentDate(dto.getPaymentDate());
        payment.setPaymentMode(dto.getPaymentMode());
        payment.setTransactionId(dto.getTransactionId());
        payment.setRemarks(dto.getRemarks());

        return feePaymentRepository.save(payment).getFeePaymentUuid();
    }

	public void updatePayment(String feePaymentUuid, FeePaymentUpdateDto updateDto) {
		FeePayment feePayment = feePaymentRepository.findByFeePaymentUuid(feePaymentUuid);
		if (feePayment == null) {
			return;
		}
		feePayment.setAmountPaid(updateDto.getAmountPaid());
		feePayment.setDiscountAmount(updateDto.getDiscountAmount());
		feePayment.setPaymentDate(updateDto.getPaymentDate());
		feePayment.setPaymentMode(updateDto.getPaymentMode());
		feePayment.setRemarks(updateDto.getRemarks());
		feePayment.setTransactionId(updateDto.getTransactionId());
		feePaymentRepository.save(feePayment);
		
	}

	public FeePaymentResponseDTO getSinglePayment(String feePaymentUuid) {

		return feePaymentRepository.getSinglePayment(feePaymentUuid);
	}

   
}
