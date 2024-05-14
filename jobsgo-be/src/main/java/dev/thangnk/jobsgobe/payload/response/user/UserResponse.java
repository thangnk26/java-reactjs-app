package dev.thangnk.jobsgobe.payload.response.user;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String image;
    private String phone;
    private String city;
    private String districts;
    private String wards;
    private String specificAddress;
    private String emailCompany;
    private String shortName;
    private String website;
    private String facebook;
    private String twitter;
    private String linkedin;
    private String description;
}
