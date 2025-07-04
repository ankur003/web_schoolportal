package com.school.portal.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.school.portal.enums.FeeType;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "master_fees")
public class MasterFee implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "master_class_uuid", nullable = false)
    private String masterClassUuid;

    @Column(name = "master_fees_uuid", nullable = false)
    private String masterFeesUuid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "master_class_uuid", referencedColumnName = "master_class_uuid", insertable = false, updatable = false)
    private MasterClass masterClass;

    @Enumerated(EnumType.STRING)
    @Column(name = "fee_type", nullable = false)
    private FeeType feeType;  // NEW FIELD

    @Column(name = "total_fee", nullable = false)
    private Double totalFee;

    @Column(name = "academic_year", nullable = false)
    private String academicYear;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @JsonIgnore
    @OneToMany(mappedBy = "masterFee", fetch = FetchType.LAZY)
    private List<FeePayment> feePayments;

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
