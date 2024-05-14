package dev.thangnk.jobsgobe.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_resume_pro_skill")
public class ResumeProSkillEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double yearExperience;
    private String name;

    //Relationship
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id")
    private ResumeEntity resume;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pro_skill_id")
    private ProSkillEntity proSkill;
}
