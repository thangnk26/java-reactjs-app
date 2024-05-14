package dev.thangnk.jobsgobe.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_soft_skill")
public class SoftSkillEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    //Relationship
    @JsonIgnore
    @OneToMany(targetEntity = ResumeSoftSkillEntity.class, mappedBy = "softSkill")
    private Set<ResumeSoftSkillEntity> listResumeSoftSkill;//for resume soft skill

    @JsonIgnore
    @ManyToMany(mappedBy = "listSoftSkill")
    private List<JobEntity> listJob;
}
