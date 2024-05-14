package dev.thangnk.jobsgobe.service.iservice;

import dev.thangnk.jobsgobe.payload.request.job.JobRequest;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.job.JobApplyResponse;
import dev.thangnk.jobsgobe.payload.response.job.JobResponse;

import java.util.List;
import java.util.TreeSet;

public interface JobIService {
    public Response<List<JobResponse>> showAll();
    public Response<List<JobResponse>> showJobOpen();
    public Response<List<JobResponse>> showJobOpenByRecruiterId(Long id);
    public Response<List<JobResponse>> showJobPause();
    public Response<List<JobResponse>> showJobPauseByRecruiterId(Long id);
    public Response<List<JobResponse>> showJobExpired();
    public Response<List<JobResponse>> showJobExpiredByRecruiterId(Long id);
    public Response<List<JobResponse>> showJobDenied();
    public Response<List<JobResponse>> showJobDeniedByRecruiterId(Long id);

    public Response<List<JobResponse>> showPending();
    public Response<List<JobResponse>> showPendingByRecruiterId(Long id);

    public Response<JobResponse> showOneJob(Long id);
    public Response<JobResponse> create(JobRequest request);
    public Response<JobResponse> update(Long id, JobRequest request);
    public  void delete(Long id);

    public Response<JobResponse> changeStatusApply(Long id);
    public Response<JobResponse> changeStatusPause(Long id);
    public Response<JobResponse> changeStatusExpired(Long id);
    public Response<JobResponse> changeStatusDenied(Long id);

    public Response<JobResponse> changeStatusPending(Long id);

    public Response<List<JobApplyResponse>> getAllJobApplyByCandidateId(Long id);
    public Response<List<JobResponse>> search(String keyword, String address);
    public Response<List<JobResponse>> showJobByCareerId(Long id);

    public Response<List<JobResponse>> showJobNoExp();

    public Response<TreeSet<JobResponse>> showSuitableJobByCandidateId(Long id);
    public Response<TreeSet<JobResponse>> showJobFeatured();
    public Response<TreeSet<JobResponse>> showJobByRecruiterId(Long id);

    public Response<List<JobResponse>> getJobNew();
    public Response<List<JobResponse>> getJobByNatureOfWork(String natureOfWork);
}
