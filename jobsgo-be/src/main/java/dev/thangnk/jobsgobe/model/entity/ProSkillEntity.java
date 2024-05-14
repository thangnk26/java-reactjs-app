package dev.thangnk.jobsgobe.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_pro_skill")
public class ProSkillEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    //Relationship
    @JsonIgnore
    @OneToMany(targetEntity = ResumeProSkillEntity.class, mappedBy = "proSkill")
    private Set<ResumeProSkillEntity> listResumeProSkill;//for resume pro skill

    @JsonIgnore
    @ManyToMany(mappedBy = "listProSkill")
    private List<JobEntity> listJob; // for job

//    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "career_id")
    private CareerEntity career;
}
