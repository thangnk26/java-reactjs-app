package dev.thangnk.jobsgobe.service.impl.job;

import dev.thangnk.jobsgobe.common.constants.TypeJob;
import dev.thangnk.jobsgobe.model.entity.*;
import dev.thangnk.jobsgobe.payload.request.job.*;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.job.JobApplyResponse;
import dev.thangnk.jobsgobe.payload.response.job.JobResponse;
import dev.thangnk.jobsgobe.payload.response.user.UserResponse;
import dev.thangnk.jobsgobe.repository.career.CareerRepository;
import dev.thangnk.jobsgobe.repository.job.JobRepository;
import dev.thangnk.jobsgobe.repository.language.LanguageRepository;
import dev.thangnk.jobsgobe.repository.proSkill.ProSkillRepository;
import dev.thangnk.jobsgobe.repository.softSkill.SoftSkillRepository;
import dev.thangnk.jobsgobe.repository.user.UserRepository;
import dev.thangnk.jobsgobe.service.iservice.JobIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService implements JobIService {
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final CareerRepository careerRepository;
    private final ProSkillRepository proSkillRepository;
    private final SoftSkillRepository softSkillRepository;
    private final LanguageRepository languageRepository;

    public UserResponse getUserResponse(UserEntity userEntity) {
        return UserResponse.builder()
                .id(userEntity.getId())
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

    public JobApplyResponse getJobApplyResponse(JobEntity job, ApplyEntity apply) {
        return JobApplyResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .nameCompany(job.getRecruiter().getName())
                .emailCompany(job.getRecruiter().getEmailCompany())
                .nameCandidate(apply.getResume().getName())
                .emailCandidate(apply.getResume().getEmail())
                .image(job.getRecruiter().getImage())
                .description(job.getDescription())
                .city(job.getCity())
                .statusSalary(job.isStatusSalary())
                .salaryFrom(job.getSalaryFrom())
                .salaryTo(job.getSalaryTo())
                .natureOfWork(job.getNatureOfWork())
                .expiredAt(job.getExpiredAt())
                .applyId(apply.getId())
                .statusApply(apply.getStatus())
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
                .salaryFrom(job.getSalaryFrom())
                .salaryTo(job.getSalaryTo())
                .statusSalary(job.isStatusSalary())
                .natureOfWork(job.getNatureOfWork())
                .createAt(job.getCreateAt())
                .updateAt(job.getUpdateAt())
                .expiredAt(job.getExpiredAt())
                .status(job.getStatus())
                .recruiter(getUserResponse(job.getRecruiter()))
                .status(job.getStatus())
                .listApply(job.getListApply())
                .listCareer(job.getListCareer())
                .listProSkill(job.getListProSkill())
                .listSoftSkill(job.getListSoftSkill())
                .listLanguage(job.getListLanguage())
                .build();
    }

    public Date getExpiredDate(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        c.add(Calendar.DATE, 30);
        return c.getTime();
    }

    @Override
    public Response<List<JobResponse>> showAll() {
        List<JobResponse> jobResponses = jobRepository.findAll()
                .stream()
                .map(this::getJobResponse)
                .collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(jobResponses)
                .build();
    }

    @Override
    public Response<List<JobResponse>> showJobOpen() {
        List<JobResponse> jobResponses = jobRepository.findAll().stream()
                .filter(jobEntity -> jobEntity.getStatus() == TypeJob.APPLY)
                .map(this::getJobResponse)
                .collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(jobResponses)
                .build();
    }

    @Override
    public Response<List<JobResponse>> showJobOpenByRecruiterId(Long id) {
        List<JobResponse> jobResponses = jobRepository.findAll().stream()
                .filter(jobEntity ->
                        jobEntity.getStatus() == TypeJob.APPLY
                                && jobEntity.getRecruiter().getId().equals(id))
                .map(this::getJobResponse)
                .collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(jobResponses)
                .build();
    }

    @Override
    public Response<List<JobResponse>> showJobPause() {
        List<JobResponse> jobResponses = jobRepository.findAll().stream()
                .filter(jobEntity -> jobEntity.getStatus() == TypeJob.PAUSE)
                .map(this::getJobResponse)
                .collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(jobResponses)
                .build();
    }

    @Override
    public Response<List<JobResponse>> showJobPauseByRecruiterId(Long id) {
        List<JobResponse> jobResponses = jobRepository.findAll().stream()
                .filter(jobEntity -> jobEntity.getStatus() == TypeJob.PAUSE && jobEntity.getRecruiter().getId().equals(id))
                .map(this::getJobResponse)
                .collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(jobResponses)
                .build();
    }

    @Override
    public Response<List<JobResponse>> showJobExpired() {
        List<JobResponse> jobResponses = jobRepository.findAll().stream()
                .filter(jobEntity -> jobEntity.getStatus() == TypeJob.EXPIRED)
                .map(this::getJobResponse)
                .collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(jobResponses)
                .build();
    }

    @Override
    public Response<List<JobResponse>> showJobExpiredByRecruiterId(Long id) {
        List<JobResponse> jobResponses = jobRepository.findAll().stream()
                .filter(jobEntity -> jobEntity.getStatus() == TypeJob.EXPIRED && jobEntity.getRecruiter().getId().equals(id))
                .map(this::getJobResponse)
                .collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(jobResponses)
                .build();
    }

    @Override
    public Response<List<JobResponse>> showJobDenied() {
        List<JobResponse> jobResponses = jobRepository.findAll().stream()
                .filter(jobEntity -> jobEntity.getStatus() == TypeJob.DENIED)
                .map(this::getJobResponse)
                .collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(jobResponses)
                .build();
    }

    @Override
    public Response<List<JobResponse>> showJobDeniedByRecruiterId(Long id) {
        List<JobResponse> jobResponses = jobRepository.findAll().stream()
                .filter(jobEntity -> jobEntity.getStatus() == TypeJob.DENIED && jobEntity.getRecruiter().getId().equals(id))
                .map(this::getJobResponse)
                .collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(jobResponses)
                .build();
    }

    @Override
    public Response<List<JobResponse>> showPending() {
        List<JobResponse> jobResponses = jobRepository.findAll().stream()
                .filter(jobEntity -> jobEntity.getStatus() == TypeJob.PENDING)
                .map(this::getJobResponse)
                .collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(jobResponses)
                .build();
    }

    @Override
    public Response<List<JobResponse>> showPendingByRecruiterId(Long id) {
        List<JobResponse> jobResponses = jobRepository.findAll().stream()
                .filter(jobEntity -> jobEntity.getStatus() == TypeJob.PENDING && jobEntity.getRecruiter().getId().equals(id))
                .map(this::getJobResponse)
                .collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(jobResponses)
                .build();
    }

    @Override
    public Response<JobResponse> showOneJob(Long id) {
        JobEntity job = jobRepository.findById(id).orElse(null);
        if (job == null) {
            return Response.<JobResponse>builder()
                    .setMessage("Not found")
                    .setSuccess(false)
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .setStatusCode(400)
                    .build();
        }
        return Response.<JobResponse>builder()
                .setData(getJobResponse(job))
                .build();
    }

    @Override
    public Response<JobResponse> create(JobRequest request) {
        UserEntity recruiter = userRepository.findById(request.getRecruiterId()).orElse(null);
        JobEntity job = JobEntity.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .required(request.getRequired())
                .benefit(request.getBenefit())
                .city(request.getCity())
                .district(request.getDistrict())
                .ward(request.getWard())
                .specificAddress(request.getSpecificAddress())
                .phone(request.getPhone())
                .degree(request.getDegree())
                .typePosition(request.getTypePosition())
                .gender(request.getGender())
                .ageStart(request.getAgeStart())
                .ageEnd(request.getAgeEnd())
                .statusAge(request.isStatusAge())
                .numberYearExperienceStart(request.getNumberYearExperienceStart())
                .numberYearExperienceEnd(request.getNumberYearExperienceEnd())
                .statusExp(request.isStatusExp())
                .salaryFrom(request.getSalaryFrom())
                .salaryTo(request.getSalaryTo())
                .statusSalary(request.isStatusSalary())
                .natureOfWork(request.getNatureOfWork())
                .createAt(new Date())
                .expiredAt(getExpiredDate(new Date()))
                .status(TypeJob.PENDING)
                .recruiter(recruiter)
                .listCareer(new ArrayList<>())
                .listProSkill(new ArrayList<>())
                .listSoftSkill(new ArrayList<>())
                .listLanguage(new ArrayList<>())
                .build();

        //career
        for (Long careerId : request.getListCareer()) {
            CareerEntity careerEntity = careerRepository.findById(careerId).orElse(null);
            if (careerEntity != null) {
                careerEntity.getListJob().add(job);
                job.getListCareer().add(careerEntity);
            }
        }

        //pro skill
        for (Long proSkillId : request.getListProSkill()) {
            ProSkillEntity proSkillEntity = proSkillRepository.findById(proSkillId).orElse(null);
            if (proSkillEntity != null) {
                proSkillEntity.getListJob().add(job);
                job.getListProSkill().add(proSkillEntity);
            }
        }

        //soft skill
        for (Long softSkillId : request.getListSoftSkill()) {
            SoftSkillEntity softSkillEntity = softSkillRepository.findById(softSkillId).orElse(null);
            if (softSkillEntity != null) {
                softSkillEntity.getListJob().add(job);
                job.getListSoftSkill().add(softSkillEntity);
            }
        }

        //language
        for (Long languageId : request.getListLanguage()) {
            LanguageEntity languageEntity = languageRepository.findById(languageId).orElse(null);
            if (languageEntity != null) {
                languageEntity.getListJob().add(job);
                job.getListLanguage().add(languageEntity);
            }
        }
        jobRepository.save(job);
        return Response.<JobResponse>builder()
                .setData(getJobResponse(job))
                .build();
    }

    @Override
    public Response<JobResponse> update(Long id, JobRequest request) {
        JobEntity jobOld = jobRepository.findById(id).orElse(null);
        if (jobOld == null) {
            return Response.<JobResponse>builder()
                    .setMessage("Not found")
                    .setSuccess(false)
                    .setStatusCode(400)
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .build();
        }
        jobOld.setTitle(request.getTitle());
        jobOld.setDescription(request.getDescription());
        jobOld.setRequired(request.getRequired());
        jobOld.setBenefit(request.getBenefit());
        jobOld.setCity(request.getCity());
        jobOld.setDistrict(request.getDistrict());
        jobOld.setWard(request.getWard());
        jobOld.setSpecificAddress(request.getSpecificAddress());
        jobOld.setPhone(request.getPhone());
        jobOld.setDegree(request.getDegree());
        jobOld.setTypePosition(request.getTypePosition());
        jobOld.setGender(request.getGender());
        jobOld.setAgeStart(request.getAgeStart());
        jobOld.setAgeEnd(request.getAgeEnd());
        jobOld.setStatusAge(request.isStatusAge());
        jobOld.setNumberYearExperienceStart(request.getNumberYearExperienceStart());
        jobOld.setNumberYearExperienceEnd(request.getNumberYearExperienceEnd());
        jobOld.setStatusExp(request.isStatusExp());
        jobOld.setSalaryFrom(request.getSalaryFrom());
        jobOld.setSalaryTo(request.getSalaryTo());
        jobOld.setStatusSalary(request.isStatusSalary());
        jobOld.setNatureOfWork(request.getNatureOfWork());
        jobOld.setUpdateAt(new Date());

        jobOld.getListCareer().clear();
        jobOld.getListProSkill().clear();
        jobOld.getListSoftSkill().clear();
        jobOld.getListLanguage().clear();
        //career
        for (Long careerId : request.getListCareer()) {
            CareerEntity careerEntity = careerRepository.findById(careerId).orElse(null);
            if (careerEntity != null) {
                careerEntity.getListJob().add(jobOld);
                jobOld.getListCareer().add(careerEntity);
            }
        }

        //pro skill
        for (Long proSkillId : request.getListProSkill()) {
            ProSkillEntity proSkillEntity = proSkillRepository.findById(proSkillId).orElse(null);
            if (proSkillEntity != null) {
                proSkillEntity.getListJob().add(jobOld);
                jobOld.getListProSkill().add(proSkillEntity);
            }
        }

        //soft skill
        for (Long softSkillId : request.getListSoftSkill()) {
            SoftSkillEntity softSkillEntity = softSkillRepository.findById(softSkillId).orElse(null);
            if (softSkillEntity != null) {
                softSkillEntity.getListJob().add(jobOld);
                jobOld.getListSoftSkill().add(softSkillEntity);
            }
        }

        //language
        for (Long languageId : request.getListLanguage()) {
            LanguageEntity languageEntity = languageRepository.findById(languageId).orElse(null);
            if (languageEntity != null) {
                languageEntity.getListJob().add(jobOld);
                jobOld.getListLanguage().add(languageEntity);
            }
        }
        jobRepository.save(jobOld);
        return Response.<JobResponse>builder()
                .setStatus(HttpStatus.CREATED)
                .setStatusCode(201)
                .setSuccess(true)
                .setData(getJobResponse(jobOld))
                .build();
    }

    @Override
    public void delete(Long id) {
        jobRepository.deleteById(id);
    }

    @Override
    public Response<JobResponse> changeStatusApply(Long id) {
        JobEntity job = jobRepository.findById(id).orElse(null);
        if (job == null) {
            return Response.<JobResponse>builder()
                    .setMessage("Not found")
                    .setSuccess(false)
                    .setStatusCode(400)
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .build();
        }
        job.setStatus(TypeJob.APPLY);
        jobRepository.save(job);
        return Response.<JobResponse>builder()
                .setData(getJobResponse(job))
                .build();
    }

    @Override
    public Response<JobResponse> changeStatusPause(Long id) {
        JobEntity job = jobRepository.findById(id).orElse(null);
        if (job == null) {
            return Response.<JobResponse>builder()
                    .setMessage("Not found")
                    .setSuccess(false)
                    .setStatusCode(400)
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .build();
        }
        job.setStatus(TypeJob.PAUSE);
        jobRepository.save(job);
        return Response.<JobResponse>builder()
                .setData(getJobResponse(job))
                .build();
    }

    @Override
    public Response<JobResponse> changeStatusExpired(Long id) {
        JobEntity job = jobRepository.findById(id).orElse(null);
        if (job == null) {
            return Response.<JobResponse>builder()
                    .setMessage("Not found")
                    .setSuccess(false)
                    .setStatusCode(400)
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .build();
        }
        job.setStatus(TypeJob.EXPIRED);
        jobRepository.save(job);
        return Response.<JobResponse>builder()
                .setData(getJobResponse(job))
                .build();
    }

    @Override
    public Response<JobResponse> changeStatusDenied(Long id){
        JobEntity job = jobRepository.findById(id).orElse(null);
        if(job == null){
            return Response.<JobResponse>builder()
                    .setMessage("Not found")
                    .setSuccess(false)
                    .setStatusCode(400)
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .build();
        }
        job.setStatus((TypeJob.DENIED));
        jobRepository.save(job);
        return Response.<JobResponse>builder()
                .setData(getJobResponse(job))
                .build();

    }

    @Override
    public Response<JobResponse> changeStatusPending(Long id) {
        JobEntity job = jobRepository.findById(id).orElse(null);
        if (job == null) {
            return Response.<JobResponse>builder()
                    .setMessage("Not found")
                    .setSuccess(false)
                    .setStatusCode(400)
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .build();
        }
        job.setStatus(TypeJob.PENDING);
        jobRepository.save(job);
        return Response.<JobResponse>builder()
                .setData(getJobResponse(job))
                .build();
    }

    @Override
    public Response<List<JobApplyResponse>> getAllJobApplyByCandidateId(Long id) {
        List<JobApplyResponse> listJob = new ArrayList<>();

        UserEntity candidate = userRepository.findById(id).orElse(null);
        if (candidate != null) {
            candidate.getListResume().stream().forEach(resume -> {
                resume.getListApply().stream().forEach(apply -> {
                    listJob.add(getJobApplyResponse(apply.getJob(), apply));
                });
            });
        }
        return Response.<List<JobApplyResponse>>builder()
                .setData(listJob)
                .setMessage("Get job apply success")
                .build();
    }

    @Override
    public Response<List<JobResponse>> search(String keyword, String address) {
        List<JobResponse> listJob = new ArrayList<>();
        if (keyword == null && address == null) {
            listJob = jobRepository.findAll()
                    .stream()
                    .map(this::getJobResponse).collect(Collectors.toList());
        } else if (keyword == null && address != null) {
            listJob = jobRepository.searchByAddress(address)
                    .stream()
                    .map(this::getJobResponse).collect(Collectors.toList());
        } else if (keyword != null && address == null) {
            listJob = jobRepository.searchByKeyword(keyword).stream()
                    .map(this::getJobResponse).collect(Collectors.toList());
        } else if (keyword != null && address != null) {
            listJob = jobRepository.searchByKeywordAndAddress(keyword, address)
                    .stream()
                    .map(this::getJobResponse)
                    .collect(Collectors.toList());
        }
        return Response.<List<JobResponse>>builder()
                .setMessage("get data success")
                .setData(listJob)
                .build();
    }

    @Override
    public Response<List<JobResponse>> showJobByCareerId(Long id) {
        List<JobResponse> listJob = jobRepository.findByCareerId(id)
                .stream()
                .map(this::getJobResponse).collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(listJob)
                .setMessage("get job success")
                .build();
    }

    @Override
    public Response<List<JobResponse>> showJobNoExp() {
        List<JobResponse> listJob = jobRepository.findJobNoExp()
                .stream()
                .map(this::getJobResponse).collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(listJob)
                .setMessage("get job no exp success")
                .build();
    }

    @Override
    public Response<TreeSet<JobResponse>> showSuitableJobByCandidateId(Long id) {
        TreeSet<JobResponse> listJob = new TreeSet<>();
        UserEntity candidate = userRepository.findById(id).get();
        Set<JobResponse> allJob = showJobOpen().getData().stream().collect(Collectors.toSet());
        if (candidate != null) {
            for (ResumeEntity resume : candidate.getListResume()) {
                for (ResumeProSkillEntity proSkillResume : resume.getListResumeProSkill()) {
                    for (JobResponse job : allJob) {
                        for (ProSkillEntity proSkillJob : job.getListProSkill()) {
                            if (proSkillJob.getName().equals(proSkillResume.getName())) {
                                listJob.add(job);
                                break;
                            }
                        }
                    }
                }
            }
        }
        return Response.<TreeSet<JobResponse>>builder()
                .setData(listJob)
                .setMessage("get suitable job success")
                .build();
    }

    @Override
    public Response<TreeSet<JobResponse>> showJobFeatured() {
        List<JobEntity> listJob = jobRepository.findAll();
        TreeSet<JobResponse> result = new TreeSet<>();
        for (JobEntity job: listJob) {
            for (UsedPackageEntity used : job.getRecruiter().getListUsedPackage()) {
                if(used.getPackageEntity().getId() == 2 && used.isStatus() && job.getStatus()==TypeJob.APPLY){
                    result.add(getJobResponse(job));
                    break;
                }
            }
        }
        return Response.<TreeSet<JobResponse>>builder()
                .setData(result)
                .setMessage("get job featured success")
                .build();
    }

    @Override
    public Response<TreeSet<JobResponse>> showJobByRecruiterId(Long id) {
        TreeSet<JobResponse> listJob = new TreeSet<>();
        UserEntity recruiter = userRepository.findById(id).orElse(null);
        if(recruiter != null){
            for (JobEntity job: recruiter.getListJob()) {
                listJob.add(getJobResponse(job));
            }
        }
        return Response.<TreeSet<JobResponse>>builder()
                .setData(listJob)
                .build();
    }

    @Override
    public Response<List<JobResponse>> getJobNew() {
        List<JobResponse> listJob = jobRepository.findJobNew()
                .stream()
                .map(this::getJobResponse)
                .collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(listJob)
                .build();
    }

    @Override
    public Response<List<JobResponse>> getJobByNatureOfWork(String natureOfWork) {
        List<JobResponse> listJob = jobRepository.findJobByNatureOfWork(natureOfWork)
                .stream()
                .map(this::getJobResponse).collect(Collectors.toList());
        return Response.<List<JobResponse>>builder()
                .setData(listJob)
                .setMessage("get job by nature of work success")
                .build();
    }

}
