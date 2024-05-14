package dev.thangnk.jobsgobe.model.entity;

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
@Table(name = "tbl_resume_soft_skill")
public class ResumeSoftSkillEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer prowess;
    private String name;

    //Relationship
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id")
    private ResumeEntity resume;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "soft_skill_id")
    private SoftSkillEntity softSkill;
}
