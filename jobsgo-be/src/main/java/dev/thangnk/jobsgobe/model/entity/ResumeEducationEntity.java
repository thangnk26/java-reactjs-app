package dev.thangnk.jobsgobe.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_resume_education")
public class ResumeEducationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nameSchool;
    private String majors;
    private String degree;
    private Integer graduationYear;
    private boolean statusEducation;
    @Column(columnDefinition = "text")
    private String description;

    @JsonIgnore
    //Relationship
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id")
    private ResumeEntity resume;
}
