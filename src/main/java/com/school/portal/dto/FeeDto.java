package com.school.portal.dto;

import java.time.LocalDateTime;

import com.school.portal.enums.FeeName;
import com.school.portal.enums.FeeType;

public class FeeDto {

    private String masterFeesUuid;
    private String masterClassUuid;
    private String className;
    private FeeType feeType;
    private FeeName feeName;
    private Double totalFee;
    private String academicYear;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public FeeDto(String masterFeesUuid, String masterClassUuid, String className,
                  FeeType feeType, FeeName feeName, Double totalFee,
                  String academicYear, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.masterFeesUuid = masterFeesUuid;
        this.masterClassUuid = masterClassUuid;
        this.className = className;
        this.feeType = feeType;
        this.feeName = feeName;
        this.totalFee = totalFee;
        this.academicYear = academicYear;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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
	 * @return the createdAt
	 */
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	/**
	 * @param createdAt the createdAt to set
	 */
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	/**
	 * @return the updatedAt
	 */
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	/**
	 * @param updatedAt the updatedAt to set
	 */
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

}