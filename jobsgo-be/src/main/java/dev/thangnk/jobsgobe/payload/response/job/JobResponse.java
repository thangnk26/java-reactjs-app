package dev.thangnk.jobsgobe.payload.response.job;

import dev.thangnk.jobsgobe.model.entity.*;
import dev.thangnk.jobsgobe.payload.response.user.UserResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@Builder
public class JobResponse implements Comparable<JobResponse>{
    private Long id;
    private String title;
    private String description;
    private String required;
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
    private Date createAt;
    private Date updateAt;
    private Date expiredAt;
    private Integer status;
    private UserResponse recruiter;
    private Set<ApplyEntity> listApply;
    private List<CareerEntity> listCareer;
    private List<ProSkillEntity> listProSkill;
    private List<SoftSkillEntity> listSoftSkill;
    private List<LanguageEntity> listLanguage;

    @Override
    public int compareTo(JobResponse o) {
        if(this.id.equals(o.id)) return 0;
        return 1;
    }
}
