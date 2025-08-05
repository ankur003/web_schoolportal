package com.school.portal.dto;

import java.time.LocalDateTime;
import java.util.Map;

import com.school.portal.enums.AcademicYear;
import com.school.portal.enums.FeeType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MasterFeeResponseDTO {
    private Long id;
    private String masterClassUuid;
    private String className;
    private Map<String, String> sections;
    private String masterFeesUuid;
    private FeeType feeType;
    private Double totalFee;
    private AcademicYear academicYear;
    private LocalDateTime createdAt;
}
