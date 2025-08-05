package com.school.portal.dto;

import javax.validation.constraints.NotBlank;

import com.school.portal.enums.AcademicYear;
import com.school.portal.enums.FeeName;
import com.school.portal.enums.FeeType;

public class MasterFeeRequestDTO {
	
	@NotBlank
    private String masterClassUuid;
	
	@NotBlank
    private FeeType feeType;
	
	@NotBlank
    private FeeName feeName;
	
	@NotBlank
    private Double totalFee;
	
    private AcademicYear academicYear;
	/**
	 * @return the masterClassUuid
	 */
	public String getMasterClassUuid() {
		return masterClassUuid;
	}
	/**
	 * @param masterClassUuid the masterClassUuid to set
	 */
	public void setMasterClassUuid(String masterClassUuid) {
		this.masterClassUuid = masterClassUuid;
	}
	/**
	 * @return the feeType
	 */
	public FeeType getFeeType() {
		return feeType;
	}
	/**
	 * @param feeType the feeType to set
	 */
	public void setFeeType(FeeType feeType) {
		this.feeType = feeType;
	}
	/**
	 * @return the feeName
	 */
	public FeeName getFeeName() {
		return feeName;
	}
	/**
	 * @param feeName the feeName to set
	 */
	public void setFeeName(FeeName feeName) {
		this.feeName = feeName;
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
	 * @return the academicYear
	 */
	public AcademicYear getAcademicYear() {
		return academicYear;
	}
	/**
	 * @param academicYear the academicYear to set
	 */
	public void setAcademicYear(AcademicYear academicYear) {
		this.academicYear = academicYear;
	}

   
}