package com.school.portal.dto;

import javax.validation.constraints.NotNull;

public class UpdateMasterFeeRequestDTO {
    
	@NotNull
    private Double totalFee;

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
	
	
}