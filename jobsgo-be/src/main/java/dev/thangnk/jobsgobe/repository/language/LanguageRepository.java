package dev.thangnk.jobsgobe.repository.language;

import dev.thangnk.jobsgobe.model.entity.LanguageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguageRepository extends JpaRepository<LanguageEntity, Long> {
}
