package com.school.portal.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.portal.domain.FeePayment;
import com.school.portal.domain.MasterClass;
import com.school.portal.domain.MasterFee;
import com.school.portal.domain.User;
import com.school.portal.domain.UserClassSection;
import com.school.portal.dto.FeeDto;
import com.school.portal.dto.FeePaymentRequestDto;
import com.school.portal.dto.FeePaymentResponseDTO;
import com.school.portal.dto.FeePaymentUpdateDto;
import com.school.portal.dto.MasterFeeRequestDTO;
import com.school.portal.dto.UpdateMasterFeeRequestDTO;
import com.school.portal.enums.AcademicYear;
import com.school.portal.enums.FeeType;
import com.school.portal.repo.FeePaymentRepository;
import com.school.portal.repo.MasterClassRepo;
import com.school.portal.repo.MasterFeeRepository;
import com.school.portal.repo.UserClassSectionRepository;
import com.school.portal.repo.UserRepo;
import com.school.portal.utils.LoggedInUserUtil;
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
	
	@Autowired
	MasterClassRepo masterClassRepo;
	
	@Autowired
	UserClassSectionRepository userClassSectionRepository;


	public List<FeePaymentResponseDTO> getPaymentsByUserUuid(String userUuid) {
        return feePaymentRepository.findAllPaymentsByUserUuid(userUuid, LoggedInUserUtil.getLoginUserAcadmicYear());

	}
	
	public String createMasterFee(MasterFeeRequestDTO dto) {
        MasterClass masterClass = masterClassRepository.findByMasterClassUuidAndAcademicYearAndIsActiveTrue(dto.getMasterClassUuid(), LoggedInUserUtil.getLoginUserAcadmicYear());
        if (masterClass == null) {
        	return null;
        }
        MasterFee masterFee = masterFeeRepository.findByFeeTypeAndFeeNameAndMasterClassIdAndAcademicYear(dto.getFeeType(), 
        		dto.getFeeName(), masterClass.getMasterClassId(), LoggedInUserUtil.getLoginUserAcadmicYear());
        if (masterFee != null) {
        	return null;
        }
        masterFee = new MasterFee();
        masterFee.setMasterFeesUuid(SchoolPortalUtils.getUniqueUuid());
        masterFee.setMasterClassId(masterClass.getMasterClassId());
        masterFee.setFeeType(dto.getFeeType());
        masterFee.setFeeName(dto.getFeeName());
        masterFee.setTotalFee(dto.getTotalFee());
        masterFee.setAcademicYear(LoggedInUserUtil.getLoginUserAcadmicYear());

        return masterFeeRepository.save(masterFee).getMasterFeesUuid();
    }

	public List<FeePaymentResponseDTO> getPaymentsByClassUuidAndSectionuuidAnduserUuid(String classUuid, String sectionUuid, String userUuid) {
		return feePaymentRepository.findAllPaymentsByClassUuidAndSectionUuidAndUserUuid(classUuid, sectionUuid, userUuid,
				LoggedInUserUtil.getLoginUserAcadmicYear());
	}

	public void updateMasterFee(String masterFeeUuid, UpdateMasterFeeRequestDTO updateFeeDto) {
		
		MasterFee masterFee = masterFeeRepository.findByMasterFeesUuid(masterFeeUuid);
		
		if (masterFee != null) {
			masterFee.setTotalFee(updateFeeDto.getTotalFee());
			masterFeeRepository.save(masterFee);
		}
	}

	public List<FeeDto> getAllMasterFees() {
		return masterFeeRepository.findAllMasterFees(LoggedInUserUtil.getLoginUserAcadmicYear());
	}

	public FeeDto getMasterFeesByMasteruuid(String masterFeeUuid) {
		return masterFeeRepository.getMasterFeesByMasteruuid(masterFeeUuid, LoggedInUserUtil.getLoginUserAcadmicYear());
	}
	
	public String createPayment(FeePaymentRequestDto dto) {
        User user = userRepo.findByUserUuidAndIsActive(dto.getUserUuid(), true);
        
        if (user == null) {
        	return null;
        }
        
        UserClassSection userClassSection =  userClassSectionRepository.findByUserAndAcademicYear(user, LoggedInUserUtil.getLoginUserAcadmicYear());

        MasterFee masterFee = masterFeeRepository.findByFeeTypeAndFeeNameAndMasterClassIdAndAcademicYear(dto.getFeeType(), dto.getFeeName(),
        		userClassSection.getMasterClass().getMasterClassId(), LoggedInUserUtil.getLoginUserAcadmicYear());
        
        if (masterFee == null) {
        	return null;
        }
        
        List<FeePayment> userFeePayments =  feePaymentRepository.findByUserAndAcademicYear(user, LoggedInUserUtil.getLoginUserAcadmicYear());
        
        for (FeePayment userFeePayment : userFeePayments) {
        	
        	MasterFee ms = userFeePayment.getMasterFee();
        	
        	if (dto.getFeeType().equals(FeeType.ONE_TIME)) {
        		if (dto.getFeeType().equals(ms.getFeeType()) 
        				&& dto.getFeeName().equals(ms.getFeeName())) {
        			return null;
        		}
        	} else if (dto.getFeeType().equals(FeeType.MONTHLY)) {
        		if (dto.getFeeType().equals(ms.getFeeType()) 
        				&& dto.getFeeName().equals(ms.getFeeName()) 
        				&& dto.getMonth().equals(userFeePayment.getMonth()) ) {
        			return null;
        		}
        	}
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
        payment.setMonth(dto.getMonth());
        payment.setYear(dto.getYear());
        payment.setAcademicYear(LoggedInUserUtil.getLoginUserAcadmicYear());

        return feePaymentRepository.save(payment).getFeePaymentUuid();
    }

	public void updatePayment(String feePaymentUuid, FeePaymentUpdateDto updateDto) {
		FeePayment feePayment = feePaymentRepository.findByFeePaymentUuidAndAcademicYear(feePaymentUuid, LoggedInUserUtil.getLoginUserAcadmicYear());
		if (feePayment == null) {
			return;
		}
		feePayment.setAmountPaid(updateDto.getAmountPaid());
		feePayment.setDiscountAmount(updateDto.getDiscountAmount());
		feePayment.setPaymentDate(updateDto.getPaymentDate());
		feePayment.setPaymentMode(updateDto.getPaymentMode());
		feePayment.setRemarks(updateDto.getRemarks());
		feePayment.setTransactionId(updateDto.getTransactionId());
		feePayment.setAcademicYear(LoggedInUserUtil.getLoginUserAcadmicYear());
		feePaymentRepository.save(feePayment);
		
	}

	public FeePaymentResponseDTO getSinglePayment(String feePaymentUuid) {

		return feePaymentRepository.getSinglePayment(feePaymentUuid, LoggedInUserUtil.getLoginUserAcadmicYear());
	}

	public List<FeeDto> getMasterFeesByClassUuid(String classUuid) {
		MasterClass masterClass = masterClassRepo.findByMasterClassUuidAndAcademicYearAndIsActiveTrue(classUuid, LoggedInUserUtil.getLoginUserAcadmicYear());
		if (masterClass == null) {
			return Collections.emptyList();
		}
		return masterFeeRepository.findMasterFeesByClassId(masterClass.getMasterClassId(), LoggedInUserUtil.getLoginUserAcadmicYear());
	}

	public List<FeePaymentResponseDTO> getAllPayments() {
		
		return feePaymentRepository.getAllPayments(LoggedInUserUtil.getLoginUserAcadmicYear());
	}

	public List<FeeDto> getMasterFeesByClassUuidAndFeeType(String classUuid, FeeType feeType) {
		MasterClass masterClass = masterClassRepo.findByMasterClassUuidAndAcademicYearAndIsActiveTrue(classUuid, LoggedInUserUtil.getLoginUserAcadmicYear());
		if (masterClass == null) {
			return Collections.emptyList();
		}
		return masterFeeRepository.findMasterFeesByClassIdAndFeeType(masterClass.getMasterClassId(), feeType, LoggedInUserUtil.getLoginUserAcadmicYear());

	}
   
}
