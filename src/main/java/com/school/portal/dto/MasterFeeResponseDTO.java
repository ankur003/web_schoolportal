package com.school.portal.dto;

import com.school.portal.enums.FeeType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MasterFeeResponseDTO {
    private Long id;
    private String masterClassUuid;
    private String className;
    private List<String> sectionName;
    private String masterFeesUuid;
    private FeeType feeType;
    private Double totalFee;
    private String academicYear;
    private LocalDateTime createdAt;
}
