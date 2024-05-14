package dev.thangnk.jobsgobe.payload.request.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class CandidateRequest {
    private String fullName;
    private String image;
    private Date birthDay;
    private String phone;
    private String address;
    private String facebook;
    private String twitter;
    private String linkedIn;
    private String github;
}
