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
@Table(name = "tbl_language")
public class LanguageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    //Relationship
    @JsonIgnore
    @OneToMany(targetEntity = ResumeLanguageEntity.class, mappedBy = "language")
    private Set<ResumeLanguageEntity> listResumeLanguage;//for resume language

    @JsonIgnore
    @ManyToMany(mappedBy = "listLanguage")
    private List<JobEntity> listJob;
}
