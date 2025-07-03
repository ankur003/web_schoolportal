package com.school.portal.repo;

import com.school.portal.domain.MasterFee;
import com.school.portal.enums.FeeType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface MasterFeeRepository extends JpaRepository<MasterFee, Long> {
    List<MasterFee> findByMasterClassUuid(String masterClassUuid);
    List<MasterFee> findByMasterClassUuidAndFeeType(String masterClassUuid, FeeType feeType);
    Optional<MasterFee> findByMasterFeesUuid(String masterFeesUuid);
}
