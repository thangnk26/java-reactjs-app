package dev.thangnk.jobsgobe.controller.job;

import dev.thangnk.jobsgobe.model.entity.JobEntity;
import dev.thangnk.jobsgobe.payload.request.job.JobRequest;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.job.JobApplyResponse;
import dev.thangnk.jobsgobe.payload.response.job.JobResponse;
import dev.thangnk.jobsgobe.payload.response.resume.ResumeResponse;
import dev.thangnk.jobsgobe.service.impl.job.JobService;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Parameter;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.TreeSet;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping("/jobs")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<List<JobResponse>> showAll() {
        Response<List<JobResponse>> jobResponse = jobService.showAll();
        return jobResponse;
    }

    @GetMapping("/public/jobs/recruiter/{id}")
    public Response<TreeSet<JobResponse>> showAllJobByRecruiterId(@PathVariable Long id) {
        Response<TreeSet<JobResponse>> jobResponse = jobService.showJobByRecruiterId(id);
        return jobResponse;
    }

    @GetMapping("/public/jobs/open")
    public Response<List<JobResponse>> showJobsOpen() {
        Response<List<JobResponse>> jobResponse = jobService.showJobOpen();
        return jobResponse;
    }
    @GetMapping("/public/jobs/open/recruiter/{id}")
    public Response<List<JobResponse>> showJobsOpenByRecruiterId(@PathVariable Long id) {
        Response<List<JobResponse>> jobResponse = jobService.showJobOpenByRecruiterId(id);
        return jobResponse;
    }

    @GetMapping("/jobs/pause")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<List<JobResponse>> showJobsPause() {
        Response<List<JobResponse>> jobResponse = jobService.showJobPause();
        return jobResponse;
    }
    @GetMapping("/jobs/pause/recruiter/{id}")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<List<JobResponse>> showJobsPauseByRecruiterId(@PathVariable Long id) {
        Response<List<JobResponse>> jobResponse = jobService.showJobPauseByRecruiterId(id);
        return jobResponse;
    }

    @GetMapping("/jobs/expired")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<List<JobResponse>> showJobsExpired() {
        Response<List<JobResponse>> jobResponse = jobService.showJobExpired();
        return jobResponse;
    }
    @GetMapping("/jobs/expired/recruiter/{id}")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<List<JobResponse>> showJobsExpiredByRecruiterId(@PathVariable Long id) {
        Response<List<JobResponse>> jobResponse = jobService.showJobExpiredByRecruiterId(id);
        return jobResponse;
    }

    @GetMapping("/jobs/denied")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<List<JobResponse>> showJobsDenied() {
        Response<List<JobResponse>> jobResponse = jobService.showJobDenied();
        return jobResponse;
    }
    @GetMapping("/jobs/denied/recruiter/{id}")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<List<JobResponse>> showJobsDeniedByRecruiterId(@PathVariable Long id) {
        Response<List<JobResponse>> jobResponse = jobService.showJobDeniedByRecruiterId(id);
        return jobResponse;
    }

    @GetMapping("/jobs/pending")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<List<JobResponse>> showJobsPending() {
        Response<List<JobResponse>> jobResponse = jobService.showPending();
        return jobResponse;
    }
    @GetMapping("/jobs/pending/recruiter/{id}")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<List<JobResponse>> showJobsPendingByRecruiterId(@PathVariable Long id) {
        Response<List<JobResponse>> jobResponse = jobService.showPendingByRecruiterId(id);
        return jobResponse;
    }

    @GetMapping("/public/jobs/{id}")
    public Response<JobResponse> showOneJob(@PathVariable Long id) {
        Response<JobResponse> jobResponse = jobService.showOneJob(id);
        return jobResponse;
    }

    @PostMapping("/jobs")
    @Secured("RECRUITER")
    public Response<JobResponse> create(@RequestBody JobRequest request) {
        Response<JobResponse> jobResponse = jobService.create(request);
        return jobResponse;
    }

    @PutMapping("/jobs/{id}")
    @Secured("RECRUITER")
    public Response<JobResponse> update(@PathVariable Long id, @RequestBody JobRequest request) {
        Response<JobResponse> jobResponse = jobService.update(id, request);
        return jobResponse;
    }

    @PutMapping("/jobs/changeStatusApply/{id}")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<JobResponse> changeStatusApply(@PathVariable Long id) {
        Response<JobResponse> jobResponse = jobService.changeStatusApply(id);
        return jobResponse;
    }

    @PutMapping("/jobs/changeStatusPause/{id}")
    @Secured("RECRUITER")
    public Response<JobResponse> changeStatusPause(@PathVariable Long id) {
        Response<JobResponse> jobResponse = jobService.changeStatusPause(id);
        return jobResponse;
    }

    @PutMapping("/jobs/changeStatusExpired/{id}")
    @Secured("ADMIN")
    public Response<JobResponse> changeStatusExpired(@PathVariable Long id) {
        Response<JobResponse> jobResponse = jobService.changeStatusExpired(id);
        return jobResponse;
    }
    @PutMapping("/jobs/changeStatusPending/{id}")
    @Secured({"RECRUITER"})
    public Response<JobResponse> changeStatusPending(@PathVariable Long id) {
        Response<JobResponse> jobResponse = jobService.changeStatusPending(id);
        return jobResponse;
    }

    @PutMapping("/jobs/changeStatusDenied/{id}")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<JobResponse> changeStatusDenied(@PathVariable Long id){
        Response<JobResponse> jobResponse = jobService.changeStatusDenied(id);
        return jobResponse;
    }
    @DeleteMapping("/jobs/{id}")
    @Secured({"RECRUITER", "ADMIN"})
    public void deleteById(@PathVariable Long id){
        jobService.delete(id);
    }

    @GetMapping("/jobs/apply/candidate/{id}")
    @Secured("CANDIDATE")
    public  Response<List<JobApplyResponse>> getAllJobApplyByCandidateId(@PathVariable Long id){
        Response<List<JobApplyResponse>> listJob = jobService.getAllJobApplyByCandidateId(id);
        return listJob;
    }

    @GetMapping("/public/jobs/search")
    public Response<List<JobResponse>> search(@RequestParam(name = "keyword", required = false) String keyword,
                                             @RequestParam(name = "address", required = false) String address){
        return jobService.search(keyword, address);
    }
    @GetMapping("/public/jobs/new")
    public Response<List<JobResponse>> search(){
        return jobService.getJobNew();
    }

    @GetMapping("/public/jobs/careers/{id}")
    public Response<List<JobResponse>> search(@PathVariable Long id){
        return jobService.showJobByCareerId(id);
    }
    @GetMapping("/public/jobs/noExp")
    public Response<List<JobResponse>> showJobNoExp(){
        return jobService.showJobNoExp();
    }
    @GetMapping("/public/jobs/suitableJob/candidate/{id}")
    public Response<TreeSet<JobResponse>> showSuitableJob(@PathVariable Long id){
        return jobService.showSuitableJobByCandidateId(id);
    }
    @GetMapping("/public/jobs/featured")
    public Response<TreeSet<JobResponse>> showJobFeatured(){
        return jobService.showJobFeatured();
    }
    @GetMapping("/public/jobs/natureOfWork")
    public Response<List<JobResponse>> showJobByNatureOfWork(@RequestParam(name = "natureOfWork", required = true) String natureOfWork){
        return jobService.getJobByNatureOfWork(natureOfWork);
    }
}
