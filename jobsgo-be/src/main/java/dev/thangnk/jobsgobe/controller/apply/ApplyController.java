package dev.thangnk.jobsgobe.controller.apply;

import dev.thangnk.jobsgobe.model.entity.ApplyEntity;
import dev.thangnk.jobsgobe.model.entity.ResumeEntity;
import dev.thangnk.jobsgobe.payload.request.apply.BaseApply;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.resume.ResumeApplyResponse;
import dev.thangnk.jobsgobe.payload.response.resume.ResumeResponse;
import dev.thangnk.jobsgobe.service.impl.apply.ApplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApplyController {
    private final ApplyService applyService;

    @PostMapping("/apply")
    @Secured("CANDIDATE")
    public Response<ApplyEntity> apply(@RequestBody BaseApply request) {
        Response<ApplyEntity> applyResponse = applyService.apply(request);
        return applyResponse;
    }

    @GetMapping("/apply/check/jobs/{jobId}/{candidateId}")
    @Secured("CANDIDATE")
    public Response<ApplyEntity> checkApply(@PathVariable Long jobId, @PathVariable Long candidateId) {
        return applyService.checkApply(jobId, candidateId);
    }
    @GetMapping("/apply/resumes/jobs/{jobId}")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<List<ResumeApplyResponse>> getAllResumeApplyByJobId(@PathVariable Long jobId, @PathVariable Integer status) {
        return applyService.getAllResumeApplyByJobId(jobId);
    }

    @GetMapping("/apply/recruiter/{recruiterId}/resumes/apply")
    @Secured("RECRUITER")
    public Response<List<ResumeApplyResponse>> getAllResumeApplyByRecruiterId(@PathVariable Long recruiterId) {
        return applyService.getAllResumeApplyByRecruiterId(recruiterId);
    }

    @GetMapping("/apply/recruiter/{recruiterId}/resumes/approve")
    @Secured("RECRUITER")
    public Response<List<ResumeApplyResponse>> getAllResumeApproveByRecruiterId(@PathVariable Long recruiterId) {
        return applyService.getAllResumeApproveByRecruiterId(recruiterId);
    }

    @GetMapping("/apply/recruiter/{recruiterId}/resumes/consider")
    @Secured("RECRUITER")
    public Response<List<ResumeApplyResponse>> getAllResumeConsiderByRecruiterId(@PathVariable Long recruiterId) {
        return applyService.getAllResumeConsiderByRecruiterId(recruiterId);
    }

    @GetMapping("/apply/recruiter/{recruiterId}/resumes/denied")
    @Secured("RECRUITER")
    public Response<List<ResumeApplyResponse>> getAllResumeDeniedByRecruiterId(@PathVariable Long recruiterId) {
        return applyService.getAllResumeDeniedByRecruiterId(recruiterId);
    }

    @PutMapping("/apply/approve/resume/{id}")
    @Secured("RECRUITER")
    public Response<ApplyEntity> approve(@PathVariable Long id) {
        return applyService.Approve(id);
    }

    @PutMapping("/apply/consider/resume/{id}")
    @Secured("RECRUITER")
    public Response<ApplyEntity> consider(@PathVariable Long id) {
        return applyService.Consider(id);
    }

    @PutMapping("/apply/denied/resume/{id}")
    @Secured("RECRUITER")
    public Response<ApplyEntity> denied(@PathVariable Long id) {
        return applyService.Denied(id);
    }

    @DeleteMapping("/apply/{id}")
    @Secured("CANDIDATE")
    public Response<ApplyEntity> deleteById(@PathVariable Long id){
        return applyService.deleteById(id);
    }

    @GetMapping("/admin/approve/{status}")
    @Secured("ADMIN")
    public Response<List<ApplyEntity>> getAllCandidateApprove(@PathVariable Integer status){
        return  applyService.getAllCandidateApprove(status);
    }
}
