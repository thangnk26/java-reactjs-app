package dev.thangnk.jobsgobe.repository.payment;

import dev.thangnk.jobsgobe.model.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {
    PaymentEntity findByVnpTxnRef(String vnpTxnRef);
    @Query(value = "select p from PaymentEntity p where p.recruiter.id = :id")
    List<PaymentEntity> findByIdUser(Long id);
}
