package dev.thangnk.jobsgobe.payload.response.resume;

import dev.thangnk.jobsgobe.model.entity.ResumeEducationEntity;
import dev.thangnk.jobsgobe.model.entity.ResumeHobbyEntity;
import dev.thangnk.jobsgobe.model.entity.ResumeWorkExperienceEntity;
import dev.thangnk.jobsgobe.payload.response.job.JobResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Builder
public class ResumeApplyResponse {
    private Long resumeId;
    private String name;
    private String image;
    private Date birthday;
    private String typePosition;
    private String positionApply;
    private String phone;
    private String email;
    private String address;
    private Double currentSalary;
    private Double desiredSalary;
    private String introduce;
    private String careerGoals;
    private Date createAt;
    private Date updateAt;
    private boolean isPublic;
    private Long candidateId;
    private String nameJobApply;
    private Long jobId;
    private Long applyId;
    private Date applyAt;
    private Integer status;
    private Set<ResumeProSkillResponse> listResumeProSkill;
    private Set<ResumeWorkExperienceEntity> listWorkExperience;
    private Set<ResumeEducationEntity> listResumeEducation;
    private Set<ResumeLanguageResponse> listResumeLanguage;
    private Set<ResumeSoftSkillResponse> listResumeSoftSkill;
    private Set<ResumeHobbyEntity> listResumeHobby;
}
