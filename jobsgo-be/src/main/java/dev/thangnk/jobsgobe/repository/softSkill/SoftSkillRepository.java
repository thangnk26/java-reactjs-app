package dev.thangnk.jobsgobe.repository.softSkill;

import dev.thangnk.jobsgobe.model.entity.ResumeHobbyEntity;
import dev.thangnk.jobsgobe.model.entity.SoftSkillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoftSkillRepository extends JpaRepository<SoftSkillEntity, Long> {
}
