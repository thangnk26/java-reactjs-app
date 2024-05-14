package dev.thangnk.jobsgobe.repository.resume;

import dev.thangnk.jobsgobe.model.entity.ResumeSoftSkillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ResumeSoftSkillRepository extends JpaRepository<ResumeSoftSkillEntity, Long> {
    @Modifying
    @Query(value = "DELETE FROM ResumeSoftSkillEntity e WHERE e.resume.id IS NULL")
    int deleteResumeIdNull();
}
