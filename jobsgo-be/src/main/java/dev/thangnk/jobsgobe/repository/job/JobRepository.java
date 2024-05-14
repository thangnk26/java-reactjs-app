package dev.thangnk.jobsgobe.repository.job;

import dev.thangnk.jobsgobe.model.entity.JobEntity;
import dev.thangnk.jobsgobe.payload.response.job.JobResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<JobEntity, Long> {
    @Query(value = "select j from JobEntity j where (j.specificAddress ilike %:address% or j.ward ilike %:address% or  j.district ilike %:address% or j.city ilike %:address%) and j.status = 0")
    public List<JobEntity> searchByAddress(String address);

    @Query(value = "select j from JobEntity j where (j.title ilike %:keyword% or j.recruiter.name ilike %:keyword%) and j.status = 0")
    public List<JobEntity> searchByKeyword(String keyword);

    @Query(value = "select j from JobEntity j where (j.title ilike %:keyword% or j.recruiter.name ilike %:keyword%) and (j.specificAddress ilike %:address% or j.ward ilike %:address% or  j.district ilike %:address% or j.city ilike %:address%) and j.status = 0")
    public List<JobEntity> searchByKeywordAndAddress(String keyword, String address);

    @Query(value = "select j from JobEntity j join j.listCareer c where c.id = :id and j.status = 0")
    public List<JobEntity> findByCareerId(Long id);

    @Query(value = "select j from JobEntity j where j.statusExp = true and j.status = 0")
    public List<JobEntity> findJobNoExp();
    @Query(value = "select j from JobEntity j where j.status = 0 order by j.createAt desc")
    public List<JobEntity> findJobNew();
    @Query(value = "select j from JobEntity j where j.status = 0 and j.natureOfWork=:naturedOfWork")
    public List<JobEntity> findJobByNatureOfWork(String naturedOfWork);


}
