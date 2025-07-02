package com.school.portal.repo;

import com.school.portal.domain.MasterFee;
import com.school.portal.enums.FeeType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MasterFeeRepository extends JpaRepository<MasterFee, Long> {
    List<MasterFee> findByClassId(Long classId);
    List<MasterFee> findByClassIdAndFeeType(Long classId, FeeType feeType);
}
