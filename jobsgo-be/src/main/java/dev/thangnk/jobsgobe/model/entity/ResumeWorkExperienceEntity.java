package dev.thangnk.jobsgobe.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_resume_work_experience")
public class ResumeWorkExperienceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nameCompany;
    private String position;
    private Date startDay;
    private Date endDay;
    private boolean statusWork;
    @Column(columnDefinition = "text")
    private String description;

    @JsonIgnore
    //Relationship
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id")
    private ResumeEntity resume;
}
