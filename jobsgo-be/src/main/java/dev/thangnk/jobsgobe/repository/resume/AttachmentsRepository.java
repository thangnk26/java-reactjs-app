package dev.thangnk.jobsgobe.repository.resume;

import dev.thangnk.jobsgobe.model.entity.AttachmentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface AttachmentsRepository extends JpaRepository<AttachmentsEntity, Long> {
    @Modifying
    @Query(value = "DELETE FROM AttachmentsEntity a WHERE a.resume.id IS NULL")
    int deleteResumeIdNull();

    @Query(value = "select a from AttachmentsEntity a where a.candidate.id=:id")
    List<AttachmentsEntity> getAttachmentsByCandidateId(Long id);
}
