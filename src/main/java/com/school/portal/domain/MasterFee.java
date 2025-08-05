package com.school.portal.domain;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import com.school.portal.enums.AcademicYear;
import com.school.portal.enums.FeeName;
import com.school.portal.enums.FeeType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "master_fees")
public class MasterFee implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 7489544695967309431L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "master_fees_uuid", nullable = false, length = 191)
    private String masterFeesUuid;

    @Column(name = "master_class_id", nullable = false, length = 191)
    private Long masterClassId;

    @Enumerated(EnumType.STRING)
    @Column(name = "fee_type", nullable = false)
    private FeeType feeType;  // NEW FIELD
    
    @Enumerated(EnumType.STRING)
    @Column(name = "fee_name", nullable = false)
    private FeeName feeName;  // NEW FIELD
    
    @Column(name = "total_fee", nullable = false)
    private Double totalFee;

    @Column(name = "academic_year", nullable = false)
    @Enumerated(EnumType.STRING)
    private AcademicYear academicYear;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Getters and setters
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
