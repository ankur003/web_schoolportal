package com.school.portal.dto;
import java.time.LocalDate;

import javax.validation.constraints.NotBlank;

public class FeePaymentUpdateDto {
	
	@NotBlank
    private Double amountPaid;
    
    private Double discountAmount;
    
    private LocalDate paymentDate;
    
    private String paymentMode;
    
    private String transactionId;
    
    private String remarks;
    
    @NotBlank
    private String feePaymentUuid;

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
	
	

}
