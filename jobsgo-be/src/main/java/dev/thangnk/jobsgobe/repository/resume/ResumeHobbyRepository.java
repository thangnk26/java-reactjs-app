package dev.thangnk.jobsgobe.repository.resume;

import dev.thangnk.jobsgobe.model.entity.ResumeHobbyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ResumeHobbyRepository extends JpaRepository<ResumeHobbyEntity, Long> {
    @Modifying
    @Query(value = "DELETE FROM ResumeHobbyEntity h WHERE h.resume.id IS NULL")
    int deleteResumeIdNull();
}
