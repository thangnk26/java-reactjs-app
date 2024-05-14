package dev.thangnk.jobsgobe.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_resume")
public class ResumeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
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
    @Column(columnDefinition = "text")
    private String introduce;
    @Column(columnDefinition = "text")
    private String careerGoals;
    private Date createAt;
    private Date updateAt;
    private boolean isPublic;
    private Integer template;

    //Relationship
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id")
    private UserEntity candidate; //for candidate(user)

    @JsonIgnore
    @OneToMany(targetEntity = ApplyEntity.class, mappedBy = "resume", cascade = CascadeType.ALL)
    private Set<ApplyEntity> listApply;//for apply

    @JsonIgnore
    @OneToMany(targetEntity = ResumeProSkillEntity.class, mappedBy = "resume", cascade = CascadeType.ALL)
    private Set<ResumeProSkillEntity> listResumeProSkill;//for resume proSkill

    @JsonIgnore
    @OneToMany(targetEntity = ResumeWorkExperienceEntity.class, mappedBy = "resume", cascade = CascadeType.ALL)
    private Set<ResumeWorkExperienceEntity> listWorkExperience;//for resume exp

    @JsonIgnore
    @OneToMany(targetEntity = ResumeEducationEntity.class, mappedBy = "resume", cascade = CascadeType.ALL)
    private Set<ResumeEducationEntity> listResumeEducation;//for resume education

    @JsonIgnore
    @OneToMany(targetEntity = ResumeLanguageEntity.class, mappedBy = "resume", cascade = CascadeType.ALL)
    private Set<ResumeLanguageEntity> listResumeLanguage;//for resume language

    @JsonIgnore
    @OneToMany(targetEntity = ResumeSoftSkillEntity.class, mappedBy = "resume", cascade = CascadeType.ALL)
    private Set<ResumeSoftSkillEntity> listResumeSoftSkill;//for resume soft skill

    @JsonIgnore
    @OneToMany(targetEntity = ResumeHobbyEntity.class,mappedBy = "resume", cascade = CascadeType.ALL)
    private Set<ResumeHobbyEntity> listResumeHobby;//for resume hobby

    @JsonIgnore
    @OneToMany(targetEntity = AttachmentsEntity.class,mappedBy = "resume", cascade = CascadeType.ALL)
    private Set<AttachmentsEntity> listAttachments;//for Attachments
}
