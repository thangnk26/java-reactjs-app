package dev.thangnk.jobsgobe.service.iservice;

import dev.thangnk.jobsgobe.model.entity.ApplyEntity;
import dev.thangnk.jobsgobe.payload.request.apply.BaseApply;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.resume.ResumeApplyResponse;

import java.util.List;

public interface ApplyIService {
    public Response<ApplyEntity> apply(BaseApply request);
    public  Response<ApplyEntity> checkApply(Long jobId, Long candidateId);
    public Response<List<ResumeApplyResponse>> getAllResumeApplyByRecruiterId(Long recruiterId);
    public Response<List<ResumeApplyResponse>> getAllResumeApproveByRecruiterId(Long recruiterId);
    public Response<List<ResumeApplyResponse>> getAllResumeConsiderByRecruiterId(Long recruiterId);
    public Response<List<ResumeApplyResponse>> getAllResumeDeniedByRecruiterId(Long recruiterId);

    public Response<ApplyEntity> Approve(Long id);
    public Response<ApplyEntity> Consider(Long id);
    public Response<ApplyEntity> Denied(Long id);

    public Response<ApplyEntity> deleteById(Long id);

    public Response<List<ResumeApplyResponse>> getAllResumeApplyByJobId(Long jobId);

    public Response<List<ApplyEntity>> getAllCandidateApprove(Integer status);
}
