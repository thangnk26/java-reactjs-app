package dev.thangnk.jobsgobe.payload.response.job;

import dev.thangnk.jobsgobe.model.entity.*;
import dev.thangnk.jobsgobe.payload.response.user.UserResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
public class JobApplyResponse {
    private Long id;
    private String title;
    private String image;
    private String nameCompany;
    private String emailCompany;
    private String nameCandidate;
    private String emailCandidate;
    private String description;
    private String city;
    private Double salaryFrom;
    private Double salaryTo;
    private boolean statusSalary;
    private String natureOfWork;
    private Date expiredAt;
    private Long applyId;
    private Integer statusApply;
}
