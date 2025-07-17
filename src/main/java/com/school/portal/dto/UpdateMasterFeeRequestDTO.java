package com.school.portal.dto;

import javax.validation.constraints.NotNull;

public class UpdateMasterFeeRequestDTO {
    
	@NotNull
    private Double totalFee;

	private String masterFeeUuid;

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

	public String getMasterFeeUuid() {
		return masterFeeUuid;
	}

	public void setMasterFeeUuid(String masterFeeUuid) {
		this.masterFeeUuid = masterFeeUuid;
	}

}