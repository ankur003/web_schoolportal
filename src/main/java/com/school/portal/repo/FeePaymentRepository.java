package com.school.portal.repo;

import com.school.portal.domain.FeePayment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FeePaymentRepository extends JpaRepository<FeePayment, Long> {
    List<FeePayment> findByUserUuid(String userUuid);

    Optional<FeePayment> findByFeePaymentUuid(String feePaymentUuid);
}

