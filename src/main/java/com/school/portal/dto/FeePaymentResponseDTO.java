package com.school.portal.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.school.portal.enums.FeeName;
import com.school.portal.enums.FeeType;
import com.school.portal.enums.Month;

public class FeePaymentResponseDTO {
	private Long rollNumber;
	private String fullName;
	private String userUuid;

	private String feePaymentUuid;
	private Double amountPaid;
	private Double discountAmount;
	private LocalDate paymentDate;
	private String paymentMode;
	private String transactionId;
	private String remarks;

	private String masterFeesUuid;
	private String academicYear;
	private Double totalFee;
	private String feeType;
	private String feeName;
	
	private String className;
	private String classSection;
	
    private String month;
    
    private String year;
	
	public FeePaymentResponseDTO() {
		
	}
	
	// Constructor must exactly match the query
    public FeePaymentResponseDTO(long rollNumber, String fullName, String userUuid,
                                 String feePaymentUuid, Double amountPaid, Double discountAmount,
                                 LocalDate paymentDate, String paymentMode, String transactionId, String remarks,
                                 String masterFeesUuid, String academicYear, Double totalFee,
                                 FeeType feeType, FeeName feeName, String className, String classSection, Month month, String year) {
        this.rollNumber = rollNumber;
        this.fullName = fullName;
        this.userUuid = userUuid;
        this.feePaymentUuid = feePaymentUuid;
        this.amountPaid = amountPaid;
        this.discountAmount = discountAmount;
        this.paymentDate = paymentDate;
        this.paymentMode = paymentMode;
        this.transactionId = transactionId;
        this.remarks = remarks;
        this.masterFeesUuid = masterFeesUuid;
        this.academicYear = academicYear;
        this.totalFee = totalFee;
        this.feeType = feeType.name();
        this.feeName = feeName.name();
        this.className = className;
        this.classSection = classSection;
        this.month = month.name();
        this.year = year;
    }
    
    

	/**
	 * @return the rollNumber
	 */
	public Long getRollNumber() {
		return rollNumber;
	}

	/**
	 * @param rollNumber the rollNumber to set
	 */
	public void setRollNumber(Long rollNumber) {
		this.rollNumber = rollNumber;
	}

	/**
	 * @return the fullName
	 */
	public String getFullName() {
		return fullName;
	}

	/**
	 * @param fullName the fullName to set
	 */
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	/**
	 * @return the userUuid
	 */
	public String getUserUuid() {
		return userUuid;
	}

	/**
	 * @param userUuid the userUuid to set
	 */
	public void setUserUuid(String userUuid) {
		this.userUuid = userUuid;
	}

	/**
	 * @return the feePaymentUuid
	 */
	public String getFeePaymentUuid() {
		return feePaymentUuid;
	}

	/**
	 * @param feePaymentUuid the feePaymentUuid to set
	 */
	public void setFeePaymentUuid(String feePaymentUuid) {
		this.feePaymentUuid = feePaymentUuid;
	}

	/**
	 * @return the amountPaid
	 */
	public Double getAmountPaid() {
		return amountPaid;
	}

	/**
	 * @param amountPaid the amountPaid to set
	 */
	public void setAmountPaid(Double amountPaid) {
		this.amountPaid = amountPaid;
	}

	/**
	 * @return the discountAmount
	 */
	public Double getDiscountAmount() {
		return discountAmount;
	}

	/**
	 * @param discountAmount the discountAmount to set
	 */
	public void setDiscountAmount(Double discountAmount) {
		this.discountAmount = discountAmount;
	}

	/**
	 * @return the paymentDate
	 */
	public LocalDate getPaymentDate() {
		return paymentDate;
	}

	/**
	 * @param paymentDate the paymentDate to set
	 */
	public void setPaymentDate(LocalDate paymentDate) {
		this.paymentDate = paymentDate;
	}

	/**
	 * @return the paymentMode
	 */
	public String getPaymentMode() {
		return paymentMode;
	}

	/**
	 * @param paymentMode the paymentMode to set
	 */
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	/**
	 * @return the transactionId
	 */
	public String getTransactionId() {
		return transactionId;
	}

	/**
	 * @param transactionId the transactionId to set
	 */
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	/**
	 * @return the remarks
	 */
	public String getRemarks() {
		return remarks;
	}

	/**
	 * @param remarks the remarks to set
	 */
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	/**
	 * @return the masterFeesUuid
	 */
	public String getMasterFeesUuid() {
		return masterFeesUuid;
	}

	/**
	 * @param masterFeesUuid the masterFeesUuid to set
	 */
	public void setMasterFeesUuid(String masterFeesUuid) {
		this.masterFeesUuid = masterFeesUuid;
	}

	/**
	 * @return the academicYear
	 */
	public String getAcademicYear() {
		return academicYear;
	}

	/**
	 * @param academicYear the academicYear to set
	 */
	public void setAcademicYear(String academicYear) {
		this.academicYear = academicYear;
	}

	/**
	 * @return the totalFee
	 */
	public Double getTotalFee() {
		return totalFee;
	}

	/**
	 * @param totalFee the totalFee to set
	 */
	public void setTotalFee(Double totalFee) {
		this.totalFee = totalFee;
	}

	/**
	 * @return the feeType
	 */
	public String getFeeType() {
		return feeType;
	}

	/**
	 * @param feeType the feeType to set
	 */
	public void setFeeType(String feeType) {
		this.feeType = feeType;
	}

	/**
	 * @return the feeName
	 */
	public String getFeeName() {
		return feeName;
	}

	/**
	 * @param feeName the feeName to set
	 */
	public void setFeeName(String feeName) {
		this.feeName = feeName;
	}

	/**
	 * @return the className
	 */
	public String getClassName() {
		return className;
	}

	/**
	 * @param className the className to set
	 */
	public void setClassName(String className) {
		this.className = className;
	}

	/**
	 * @return the classSection
	 */
	public String getClassSection() {
		return classSection;
	}

	/**
	 * @param classSection the classSection to set
	 */
	public void setClassSection(String classSection) {
		this.classSection = classSection;
	}

	/**
	 * @return the month
	 */
	public String getMonth() {
		return month;
	}

	/**
	 * @param month the month to set
	 */
	public void setMonth(String month) {
		this.month = month;
	}

	/**
	 * @return the year
	 */
	public String getYear() {
		return year;
	}

	/**
	 * @param year the year to set
	 */
	public void setYear(String year) {
		this.year = year;
	}
	
	
}
