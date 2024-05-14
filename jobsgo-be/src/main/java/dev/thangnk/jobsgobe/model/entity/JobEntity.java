package dev.thangnk.jobsgobe.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_job")
public class JobEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(columnDefinition = "text")
    private String description;
    @Column(columnDefinition = "text")
    private String required;
    @Column(columnDefinition = "text")
    private String benefit;
    private String city;
    private String district;
    private String ward;
    private String specificAddress;
    private String phone;
    private String degree;
    private String typePosition;
    private Integer gender;
    private Double ageStart;
    private Double ageEnd;
    private boolean statusAge;
    private Double numberYearExperienceStart;
    private Double numberYearExperienceEnd;
    private boolean statusExp;
    private Double salaryFrom;
    private Double salaryTo;
    private boolean statusSalary;
    private String natureOfWork;
    private Integer status;
    private Date createAt;
    private Date updateAt;
    private Date expiredAt;

    //Relationship
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recruiter_id")
    private UserEntity recruiter; //for recruiter(user)

    @JsonIgnore
    @OneToMany(targetEntity = ApplyEntity.class, mappedBy = "job")
    private Set<ApplyEntity> listApply;//for apply

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "tbl_job_career",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "career_id"))
    private List<CareerEntity> listCareer; //for career

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "tbl_job_pro_skill",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "pro_skill_id"))
    private List<ProSkillEntity> listProSkill; //for pro skill

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "tbl_job_soft_skill",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "soft_skill_id"))
    private List<SoftSkillEntity> listSoftSkill; //for soft skill

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "tbl_job_language",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "language_id"))
    private List<LanguageEntity> listLanguage; //for language
}
