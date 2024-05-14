package dev.thangnk.jobsgobe.service.impl.apply;

import dev.thangnk.jobsgobe.common.constants.TypeApply;
import dev.thangnk.jobsgobe.model.entity.*;
import dev.thangnk.jobsgobe.payload.request.apply.BaseApply;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.job.JobResponse;
import dev.thangnk.jobsgobe.payload.response.resume.*;
import dev.thangnk.jobsgobe.payload.response.user.UserResponse;
import dev.thangnk.jobsgobe.repository.apply.ApplyRepository;
import dev.thangnk.jobsgobe.repository.job.JobRepository;
import dev.thangnk.jobsgobe.repository.resume.ResumeRepository;
import dev.thangnk.jobsgobe.repository.user.UserRepository;
import dev.thangnk.jobsgobe.service.iservice.ApplyIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplyService implements ApplyIService {
    private final ApplyRepository applyRepository;
    private final JobRepository jobRepository;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public UserResponse getUserResponse(UserEntity userEntity){
        return UserResponse.builder()
                .email(userEntity.getEmail())
                .password(userEntity.getPassword())
                .name(userEntity.getName())
                .image(userEntity.getImage())
                .phone(userEntity.getPhone())
                .city(userEntity.getCity())
                .districts(userEntity.getDistricts())
                .wards(userEntity.getWards())
                .specificAddress(userEntity.getSpecificAddress())
                .emailCompany(userEntity.getEmailCompany())
                .shortName(userEntity.getShortName())
                .website(userEntity.getWebsite())
                .facebook(userEntity.getFacebook())
                .twitter(userEntity.getTwitter())
                .linkedin(userEntity.getLinkedIn())
                .description(userEntity.getDescription())
                .build();
    }
    public JobResponse getJobResponse(JobEntity job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .required(job.getRequired())
                .benefit(job.getBenefit())
                .city(job.getCity())
                .district(job.getDistrict())
                .ward(job.getWard())
                .specificAddress(job.getSpecificAddress())
                .phone(job.getPhone())
                .degree(job.getDegree())
                .typePosition(job.getTypePosition())
                .gender(job.getGender())
                .ageStart(job.getAgeStart())
                .ageEnd(job.getAgeEnd())
                .statusAge(job.isStatusAge())
                .numberYearExperienceStart(job.getNumberYearExperienceStart())
                .numberYearExperienceEnd(job.getNumberYearExperienceEnd())
                .statusExp(job.isStatusExp())
                .statusSalary(job.isStatusSalary())
                .salaryFrom(job.getSalaryFrom())
                .salaryTo(job.getSalaryTo())
                .natureOfWork(job.getNatureOfWork())
                .createAt(job.getCreateAt())
                .expiredAt(job.getExpiredAt())
                .updateAt(job.getUpdateAt())
                .status(job.getStatus())
                .recruiter(getUserResponse(job.getRecruiter()))
                .listApply(job.getListApply())
                .listCareer(job.getListCareer())
                .listProSkill(job.getListProSkill())
                .listSoftSkill(job.getListSoftSkill())
                .listLanguage(job.getListLanguage())
                .build();
    }
    public ResumeApplyResponse getResumeApplyResponse(ResumeEntity resume, ApplyEntity apply) {
        return ResumeApplyResponse.builder()
                .resumeId(resume.getId())
                .name(resume.getName())
                .image(resume.getImage())
                .birthday(resume.getBirthday())
                .typePosition(resume.getTypePosition())
                .positionApply(resume.getPositionApply())
                .phone(resume.getPhone())
                .email(resume.getEmail())
                .address(resume.getAddress())
                .currentSalary(resume.getCurrentSalary())
                .desiredSalary(resume.getDesiredSalary())
                .introduce(resume.getIntroduce())
                .careerGoals(resume.getCareerGoals())
                .createAt(resume.getCreateAt())
                .updateAt(resume.getUpdateAt())
                .isPublic(resume.isPublic())
                .candidateId(resume.getCandidate().getId())
                .nameJobApply(getJobResponse(apply.getJob()).getTitle())
                .jobId(getJobResponse(apply.getJob()).getId())
                .applyId(apply.getId())
                .applyAt(apply.getDate_apply())
                .status(apply.getStatus())
                .listResumeProSkill(resume.getListResumeProSkill().stream().map(proSkill ->
                        ResumeProSkillResponse.builder()
                                .id(proSkill.getId())
                                .yearExperience(proSkill.getYearExperience())
                                .proSkillId(proSkill.getProSkill() != null ? proSkill.getProSkill().getId() : null)
                                .proSkillName(proSkill.getProSkill() != null ? proSkill.getProSkill().getName() : proSkill.getName())
                                .build()
                ).collect(Collectors.toSet()))
                .listWorkExperience(resume.getListWorkExperience().stream().map(workExp ->
                        ResumeWorkExperienceEntity.builder()
                                .id(workExp.getId())
                                .nameCompany(workExp.getNameCompany())
                                .position(workExp.getPosition())
                                .startDay(workExp.getStartDay())
                                .endDay(workExp.getEndDay())
                                .statusWork(workExp.isStatusWork())
                                .description(workExp.getDescription())
                                .build()
                ).collect(Collectors.toSet()))
                .listResumeEducation(resume.getListResumeEducation().stream().map(education ->
                        ResumeEducationEntity.builder()
                                .id(education.getId())
                                .nameSchool(education.getNameSchool())
                                .majors(education.getMajors())
                                .degree(education.getDegree())
                                .graduationYear(education.getGraduationYear())
                                .statusEducation(education.isStatusEducation())
                                .description(education.getDescription())
                                .build()
                ).collect(Collectors.toSet()))
                .listResumeLanguage(resume.getListResumeLanguage().stream().map(language ->
                        ResumeLanguageResponse.builder()
                                .id(language.getId())
                                .prowess(language.getProwess())
                                .languageId(language.getLanguage() != null ? language.getLanguage().getId() : null)
                                .languageName(language.getLanguage() != null ? language.getLanguage().getName() : language.getName())
                                .build()
                ).collect(Collectors.toSet()))
                .listResumeSoftSkill(resume.getListResumeSoftSkill().stream().map(softSkill ->
                        ResumeSoftSkillResponse.builder()
                                .id(softSkill.getId())
                                .prowess(softSkill.getProwess())
                                .softSkillId(softSkill.getSoftSkill() != null ? softSkill.getSoftSkill().getId() : null)
                                .softSkillName(softSkill.getSoftSkill() != null ? softSkill.getSoftSkill().getName() : softSkill.getName())
                                .build()
                ).collect(Collectors.toSet()))
                .listResumeHobby(resume.getListResumeHobby().stream().map(hobby ->
                        ResumeHobbyEntity.builder()
                                .id(hobby.getId())
                                .name(hobby.getName())
                                .build()
                ).collect(Collectors.toSet()))
                .build();
    }
    @Override
    public Response<ApplyEntity> apply(BaseApply request) {
        if(request.getJobId() == null && request.getResumeId() == null){
            return Response.<ApplyEntity>builder()
                    .setMessage("Not found")
                    .setSuccess(false)
                    .setStatusCode(404)
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .build();
        }
        if(request.getJobId() != null){
            JobEntity jobEntity = jobRepository.findById(request.getJobId()).orElse(null);
            ResumeEntity resumeEntity = resumeRepository.findById(request.getResumeId()).orElse(null);

            ApplyEntity applyEntity = ApplyEntity.builder()
                    .date_apply(new Date())
                    .status(TypeApply.APPLY)
                    .job(jobEntity)
                    .resume(resumeEntity)
                    .build();

            applyRepository.save(applyEntity);
            return Response.<ApplyEntity>builder()
                    .setData(applyEntity)
                    .build();
        }
        return Response.<ApplyEntity>builder()
                .setStatus(HttpStatus.BAD_REQUEST)
                .setSuccess(false)
                .setStatusCode(400)
                .setMessage("Apply failed")
                .setData(null)
                .build();
    }

    @Override
    public Response<ApplyEntity> checkApply(Long jobId, Long candidateId) {
        JobEntity jobEntity = jobRepository.findById(jobId).orElse(null);
        if(jobEntity != null){
            ApplyEntity currentApply = jobEntity.getListApply()
                    .stream()
                    .filter(applyEntity -> applyEntity.getResume().getCandidate().getId().equals(candidateId))
                    .findFirst()
                    .orElse(null);
            if(currentApply != null){
                return Response.<ApplyEntity>builder()
                        .setMessage("Applied")
                        .setData(currentApply)
                        .build();
            }
        }
        return Response.<ApplyEntity>builder()
                .setStatus(HttpStatus.BAD_REQUEST)
                .setSuccess(false)
                .setStatusCode(400)
                .setMessage("have not applied yet")
                .setData(null)
                .build();
    }

    @Override
    public Response<List<ResumeApplyResponse>> getAllResumeApplyByRecruiterId(Long recruiterId) {
        List<ResumeApplyResponse> listResumeApply = new ArrayList<>();
        UserEntity recruiter = userRepository.findById(recruiterId).orElse(null);
        if(recruiter != null){
            recruiter.getListJob().stream().forEach(job -> {
                job.getListApply().stream().forEach(apply -> {
                    if(apply.getStatus().equals(TypeApply.APPLY)){
                        listResumeApply.add(getResumeApplyResponse(apply.getResume(), apply));
                    }
                });
            });
        }
        return Response.<List<ResumeApplyResponse>>builder()
                .setMessage("Get list apply success")
                .setData(listResumeApply)
                .build();
    }

    @Override
    public Response<List<ResumeApplyResponse>> getAllResumeApproveByRecruiterId(Long recruiterId) {
        List<ResumeApplyResponse> listResumeApprove = new ArrayList<>();
        UserEntity recruiter = userRepository.findById(recruiterId).orElse(null);
        if(recruiter != null){
            recruiter.getListJob().stream().forEach(job -> {
                job.getListApply().stream().forEach(apply -> {
                    if(apply.getStatus().equals(TypeApply.APPROVE)){
                        listResumeApprove.add(getResumeApplyResponse(apply.getResume(), apply));
                    }
                });
            });
        }
        return Response.<List<ResumeApplyResponse>>builder()
                .setMessage("Get list approve success")
                .setData(listResumeApprove)
                .build();
    }

    @Override
    public Response<List<ResumeApplyResponse>> getAllResumeConsiderByRecruiterId(Long recruiterId) {
        List<ResumeApplyResponse> listResumeConsider = new ArrayList<>();
        UserEntity recruiter = userRepository.findById(recruiterId).orElse(null);
        if(recruiter != null){
            recruiter.getListJob().stream().forEach(job -> {
                job.getListApply().stream().forEach(apply -> {
                    if(apply.getStatus().equals(TypeApply.CONSIDER)){
                        listResumeConsider.add(getResumeApplyResponse(apply.getResume(), apply));
                    }
                });
            });
        }
        return Response.<List<ResumeApplyResponse>>builder()
                .setMessage("Get list consider success")
                .setData(listResumeConsider)
                .build();
    }

    @Override
    public Response<List<ResumeApplyResponse>> getAllResumeDeniedByRecruiterId(Long recruiterId) {
        List<ResumeApplyResponse> listResumeDenied = new ArrayList<>();
        UserEntity recruiter = userRepository.findById(recruiterId).orElse(null);
        if(recruiter != null){
            recruiter.getListJob().stream().forEach(job -> {
                job.getListApply().stream().forEach(apply -> {
                    if(apply.getStatus().equals(TypeApply.DENIED)){
                        listResumeDenied.add(getResumeApplyResponse(apply.getResume(), apply));
                    }
                });
            });
        }
        return Response.<List<ResumeApplyResponse>>builder()
                .setMessage("Get list denied success")
                .setData(listResumeDenied)
                .build();
    }

    @Override
    public Response<ApplyEntity> Approve(Long id) {
        ApplyEntity applyEntity = applyRepository.findById(id).orElse(null);
        applyEntity.setStatus(TypeApply.APPROVE);
        applyEntity.setDate_approve(new Date());
        applyRepository.save(applyEntity);
        return Response.<ApplyEntity>builder()
                .setData(applyEntity)
                .setMessage("Approve success")
                .build();
    }

    @Override
    public Response<ApplyEntity> Consider(Long id) {
        ApplyEntity applyEntity = applyRepository.findById(id).orElse(null);
        applyEntity.setStatus(TypeApply.CONSIDER);
        applyEntity.setDate_consider(new Date());
        applyRepository.save(applyEntity);
        return Response.<ApplyEntity>builder()
                .setData(applyEntity)
                .setMessage("Consider success")
                .build();
    }

    @Override
    public Response<ApplyEntity> Denied(Long id) {
        ApplyEntity applyEntity = applyRepository.findById(id).orElse(null);
        applyEntity.setStatus(TypeApply.DENIED);
        applyEntity.setDate_denied(new Date());
        applyRepository.save(applyEntity);
        return Response.<ApplyEntity>builder()
                .setData(applyEntity)
                .setMessage("Denied success")
                .build();
    }

    @Override
    public Response<ApplyEntity> deleteById(Long id) {
        ApplyEntity apply = applyRepository.findById(id).orElse(null);
        if(apply != null){
            applyRepository.deleteById(id);
        }
        return Response.<ApplyEntity>builder().build();
    }

    @Override
    public Response<List<ResumeApplyResponse>> getAllResumeApplyByJobId(Long jobId) {
        JobEntity job = jobRepository.findById(jobId).orElse(null);
        List<ResumeApplyResponse> listResume = new ArrayList<>();
        if(job != null){
            for (ApplyEntity apply: job.getListApply()) {
                listResume.add(getResumeApplyResponse(apply.getResume(), apply));
            }
        }
        return Response.<List<ResumeApplyResponse>>builder()
                .setMessage("Get list resume apply success")
                .setData(listResume)
                .build();
    }

    @Override
    public Response<List<ApplyEntity>> getAllCandidateApprove(Integer status) {
        List<ApplyEntity> applyApprove = new ArrayList<>();
        if(status != null){
            applyApprove = applyRepository.showAllCandidateApprove(status);

        }
        return Response.<List<ApplyEntity>>builder()
                .setMessage("Get data success")
                .setData(applyApprove)
                .build();

    }
}
