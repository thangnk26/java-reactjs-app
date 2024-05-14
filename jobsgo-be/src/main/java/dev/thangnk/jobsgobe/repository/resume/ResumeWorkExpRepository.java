package dev.thangnk.jobsgobe.repository.resume;

import dev.thangnk.jobsgobe.model.entity.ResumeWorkExperienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ResumeWorkExpRepository extends JpaRepository<ResumeWorkExperienceEntity, Long> {
    @Modifying
    @Query(value = "DELETE FROM ResumeWorkExperienceEntity e WHERE e.resume.id IS NULL")
    int deleteResumeIdNull();
}
