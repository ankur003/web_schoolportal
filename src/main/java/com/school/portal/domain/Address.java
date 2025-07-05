package com.school.portal.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
	private Long addressId;
	
	@Column(unique = true, nullable = false, updatable = false, length = 191)
	@JsonIgnore
	private String addressUuid;
	
	@OneToOne
	@JsonIgnore
	private User user;
	
	private String pHouseNo;
	
	private String pBuildingName;
	
	private String pFloorNo;
	
	private String pFlatNo;
	
	private String pDistrict;
	
	private String pTehsil;
	
	private String pVillage;
	
	private String pPinCode;
	
	private String pState;
	
	private String pCoutry;
	
	private String cHouseNo;
	
	private String cBuildingName;
	
	private String cFloorNo;
	
	private String cFlatNo;
	
	private String cDistrict;
	
	private String cTehsil;
	
	private String cVillage;
	
	private String cPinCode;
	
	private String cState;
	
	private String cCoutry;
	
	private String createdBy;
	
	private LocalDateTime createdAt;
	
	private LocalDateTime updatedAt;

	public Long getAddressId() {
		return addressId;
	}

	public void setAddressId(Long addressId) {
		this.addressId = addressId;
	}

	public String getAddressUuid() {
		return addressUuid;
	}

	public void setAddressUuid(String addressUuid) {
		this.addressUuid = addressUuid;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getpHouseNo() {
		return pHouseNo;
	}

	public void setpHouseNo(String pHouseNo) {
		this.pHouseNo = pHouseNo;
	}

	public String getpBuildingName() {
		return pBuildingName;
	}

	public void setpBuildingName(String pBuildingName) {
		this.pBuildingName = pBuildingName;
	}

	public String getpFloorNo() {
		return pFloorNo;
	}

	public void setpFloorNo(String pFloorNo) {
		this.pFloorNo = pFloorNo;
	}

	public String getpFlatNo() {
		return pFlatNo;
	}

	public void setpFlatNo(String pFlatNo) {
		this.pFlatNo = pFlatNo;
	}

	public String getpDistrict() {
		return pDistrict;
	}

	public void setpDistrict(String pDistrict) {
		this.pDistrict = pDistrict;
	}

	public String getpTehsil() {
		return pTehsil;
	}

	public void setpTehsil(String pTehsil) {
		this.pTehsil = pTehsil;
	}

	public String getpVillage() {
		return pVillage;
	}

	public void setpVillage(String pVillage) {
		this.pVillage = pVillage;
	}

	public String getpPinCode() {
		return pPinCode;
	}

	public void setpPinCode(String pPinCode) {
		this.pPinCode = pPinCode;
	}

	public String getpState() {
		return pState;
	}

	public void setpState(String pState) {
		this.pState = pState;
	}

	public String getpCoutry() {
		return pCoutry;
	}

	public void setpCoutry(String pCoutry) {
		this.pCoutry = pCoutry;
	}

	public String getcHouseNo() {
		return cHouseNo;
	}

	public void setcHouseNo(String cHouseNo) {
		this.cHouseNo = cHouseNo;
	}

	public String getcBuildingName() {
		return cBuildingName;
	}

	public void setcBuildingName(String cBuildingName) {
		this.cBuildingName = cBuildingName;
	}

	public String getcFloorNo() {
		return cFloorNo;
	}

	public void setcFloorNo(String cFloorNo) {
		this.cFloorNo = cFloorNo;
	}

	public String getcFlatNo() {
		return cFlatNo;
	}

	public void setcFlatNo(String cFlatNo) {
		this.cFlatNo = cFlatNo;
	}

	public String getcDistrict() {
		return cDistrict;
	}

	public void setcDistrict(String cDistrict) {
		this.cDistrict = cDistrict;
	}

	public String getcTehsil() {
		return cTehsil;
	}

	public void setcTehsil(String cTehsil) {
		this.cTehsil = cTehsil;
	}

	public String getcVillage() {
		return cVillage;
	}

	public void setcVillage(String cVillage) {
		this.cVillage = cVillage;
	}

	public String getcPinCode() {
		return cPinCode;
	}

	public void setcPinCode(String cPinCode) {
		this.cPinCode = cPinCode;
	}

	public String getcState() {
		return cState;
	}

	public void setcState(String cState) {
		this.cState = cState;
	}

	public String getcCoutry() {
		return cCoutry;
	}

	public void setcCoutry(String cCoutry) {
		this.cCoutry = cCoutry;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	
}