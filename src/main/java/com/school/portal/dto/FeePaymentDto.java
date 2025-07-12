package com.school.portal.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.school.portal.domain.TeacherTimeTable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeePaymentDto {

	private String userUuid;

	private String username;
	
	private String fullName;
	
	private String fatherName;

	private long rollNumber;

	private String enrollmentNumber;

	private String feePaymentUuid;

	private String masterClassUuid;

	private String className;

	private String masterSectionUuid;

	private String sectionName;

	private Double amountPaid;

	private LocalDate paymentDate;

	private String paymentMode;

	private String transactionId;

	private String remarks;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;

}