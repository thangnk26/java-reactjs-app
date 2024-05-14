package dev.thangnk.jobsgobe.payload.request.job;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobRequest {
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
    private Long recruiterId;
    private List<Long> listCareer;
    private List<Long> listProSkill;
    private List<Long> listSoftSkill;
    private List<Long> listLanguage;
}
