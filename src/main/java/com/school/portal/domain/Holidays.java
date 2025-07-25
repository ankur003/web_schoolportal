package com.school.portal.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Entity
@Getter @Setter
public class Holidays {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
	private Long holidayId;
	
	@Column(unique = true, nullable = false, updatable = false, length = 191)
	private String holidayUuid; 
	
	@Column(unique = true, nullable = false)
	private String holidayDate;
	
	private String holidayName;
	
	private String holidayRemark;
	
	private String holidayType;
	
	private String createdBy;
	
	private LocalDateTime createdAt;
	
	private LocalDateTime updatedAt;
}