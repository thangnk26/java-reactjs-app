package dev.thangnk.jobsgobe.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.thangnk.jobsgobe.common.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_user")
public class UserEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private String name;
    @Column(columnDefinition = "text")
    private String image;
    private Date birthDay;
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
    private String linkedIn;
    private String github;
    private boolean isLock;
    private Date createAt;
    private Date updateAt;
    @Column(columnDefinition = "text")
    private String contentEmailAccept;
    @Column(columnDefinition = "text")
    private String contentEmailDenied;
    @Column(columnDefinition = "text")
    private String description;
    @Enumerated(EnumType.STRING)
    private Role role;

    //Relationship

    @JsonIgnore
    @OneToMany(targetEntity = ResumeEntity.class, mappedBy = "candidate")
    private Set<ResumeEntity> listResume;//for resume

//    @JsonIgnore
    @OneToMany(targetEntity = JobEntity.class, mappedBy = "recruiter")
    private Set<JobEntity> listJob;//for job

    @JsonIgnore
    @OneToMany(targetEntity = PaymentEntity.class, mappedBy = "recruiter")
    private Set<PaymentEntity> listPayment;//for payment

    @JsonIgnore
    @OneToMany(targetEntity = AttachmentsEntity.class, mappedBy = "candidate")
    private Set<AttachmentsEntity> listAttachment;//for payment

    @JsonIgnore
    @OneToMany(targetEntity = UsedPackageEntity.class, mappedBy = "recruiter")
    private Set<UsedPackageEntity> listUsedPackage;//for usedPackage

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return password;
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return email;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }
}
