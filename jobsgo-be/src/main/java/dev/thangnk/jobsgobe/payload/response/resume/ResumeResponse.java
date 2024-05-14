package dev.thangnk.jobsgobe.payload.response.resume;

import dev.thangnk.jobsgobe.model.entity.AttachmentsEntity;
import dev.thangnk.jobsgobe.model.entity.ResumeEducationEntity;
import dev.thangnk.jobsgobe.model.entity.ResumeHobbyEntity;
import dev.thangnk.jobsgobe.model.entity.ResumeWorkExperienceEntity;
import dev.thangnk.jobsgobe.payload.request.resume.ResumeLanguageRequest;
import dev.thangnk.jobsgobe.payload.request.resume.ResumeProSkillRequest;
import dev.thangnk.jobsgobe.payload.request.resume.ResumeSoftSkillRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Builder
public class ResumeResponse {
    private Long resumeId;
    private String name;
    private String image;
    private Date birthday;
    private String typePosition;
    private String positionApply;
    private String phone;
    private String email;
    private String github;
    private String facebook;
    private String twitter;
    private String linkedIn;
    private String address;
    private Double currentSalary;
    private Double desiredSalary;
    private String introduce;
    private String careerGoals;
    private Date createAt;
    private Date updateAt;
    private boolean isPublic;
    private Integer template;
    private Long candidateId;
    private Set<ResumeProSkillResponse> listResumeProSkill;
    private Set<ResumeWorkExperienceEntity> listWorkExperience;
    private Set<ResumeEducationEntity> listResumeEducation;
    private Set<ResumeLanguageResponse> listResumeLanguage;
    private Set<ResumeSoftSkillResponse> listResumeSoftSkill;
    private Set<ResumeHobbyEntity> listResumeHobby;
    private Set<AttachmentsEntity> listAttachments;
}
