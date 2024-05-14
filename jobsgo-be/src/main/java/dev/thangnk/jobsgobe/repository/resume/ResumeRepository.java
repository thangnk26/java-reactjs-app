package dev.thangnk.jobsgobe.repository.resume;

import dev.thangnk.jobsgobe.model.entity.ResumeEntity;
import dev.thangnk.jobsgobe.payload.response.resume.ResumeResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeRepository extends JpaRepository<ResumeEntity, Long> {
    @Query(value = "select r from ResumeEntity r where r.candidate.id = :id")
    public List<ResumeEntity> showAllByCandidateId(Long id);

    @Query(value = "select r from ResumeEntity r where r.typePosition = :position")
    public List<ResumeEntity> searchByPosition(String position);
    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeProSkillEntity rs ON r.id = rs.resume.id WHERE rs.name = :specialized")
    public List<ResumeEntity> searchBySpecialized(@Param("specialized") String specialized);

    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeLanguageEntity rl ON r.id = rl.resume.id WHERE rl.name = :language")
    public List<ResumeEntity> searchByLanguage(String language);

    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeEducationEntity rd ON r.id = rd.resume.id WHERE rd.degree = :degree")
    public List<ResumeEntity> searchByDegree(String degree);

    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeProSkillEntity rs ON r.id = rs.resume.id where r.typePosition = :position and rs.name = :specialized ")
    public List<ResumeEntity> searchByPositionAndSpecialized(String position, String specialized);
    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeLanguageEntity rl ON r.id = rl.resume.id where r.typePosition = :position and  rl.name = :language ")
    public List<ResumeEntity> searchByPositionAndLanguage(String position, String language);
    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeEducationEntity rd ON r.id = rd.resume.id where r.typePosition = :position and  rd.degree = :degree ")
    public List<ResumeEntity> searchByPositionAndDegree(String position, String degree);

    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeProSkillEntity rs ON r.id = rs.resume.id INNER JOIN ResumeLanguageEntity rl ON r.id = rl.resume.id WHERE rs.name = :specialized AND rl.name = :language")
    public List<ResumeEntity> searchBySpecializedAndLanguage(String specialized, String language);

    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeProSkillEntity rs ON r.id = rs.resume.id INNER JOIN ResumeEducationEntity rd ON r.id = rd.resume.id WHERE rs.name = :specialized AND rd.degree = :degree")
    public List<ResumeEntity> searchBySpecializedAndDegree(String specialized, String degree);
    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeLanguageEntity rl ON r.id = rl.resume.id INNER JOIN ResumeEducationEntity rd ON r.id = rd.resume.id WHERE rl.name = :language AND rd.degree = :degree")
    public List<ResumeEntity> searchByLanguageAndDegree(String language, String degree);

    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeProSkillEntity rs ON r.id = rs.resume.id INNER JOIN ResumeLanguageEntity rl ON r.id = rl.resume.id WHERE r.typePosition = :position AND rs.name = :specialized AND rl.name = :language" )
    public List<ResumeEntity> searchByPositionAndSpecializedAndLanguage( String position, String specialized, String language);

    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeProSkillEntity rs ON r.id = rs.resume.id INNER JOIN ResumeEducationEntity rd ON r.id = rd.resume.id WHERE r.typePosition = :position AND rs.name = :specialized AND rd.degree = :degree")
    public List<ResumeEntity> searchByPositionAndSpecializedAndDegree( String position, String specialized, String degree);
    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeLanguageEntity rl ON r.id = rl.resume.id INNER JOIN ResumeEducationEntity rd ON r.id = rd.resume.id WHERE r.typePosition = :position AND rl.name = :language AND rd.degree = :degree")
    public List<ResumeEntity> searchByPositionAndLanguageAndDegree( String position, String language, String degree);

    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeProSkillEntity rs ON r.id = rs.resume.id INNER JOIN ResumeLanguageEntity rl ON r.id = rl.resume.id INNER JOIN ResumeEducationEntity rd ON r.id = rd.resume.id WHERE rs.name = :specialized AND rl.name = :language AND rd.degree = :degree")
    public List<ResumeEntity> searchBySpecializedAndLanguageAndDegree( String specialized, String language, String degree);
    @Query(value = "SELECT r FROM ResumeEntity r INNER JOIN ResumeProSkillEntity rs ON r.id = rs.resume.id INNER JOIN ResumeLanguageEntity rl ON r.id = rl.resume.id INNER JOIN ResumeEducationEntity rd ON r.id = rd.resume.id WHERE r.typePosition = :position AND rs.name = :specialized AND rl.name = :language AND rd.degree = :degree")
    public List<ResumeEntity> searchByPositionAndSpecializedAndLanguageAndDegree(String position, String specialized, String language, String degree);

}
