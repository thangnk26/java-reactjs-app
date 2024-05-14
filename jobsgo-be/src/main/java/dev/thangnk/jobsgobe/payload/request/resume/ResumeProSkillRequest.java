package dev.thangnk.jobsgobe.payload.request.resume;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeProSkillRequest {
    private Long id;
    private Double yearExperience;
    private Long proSkillId;
    private String proSkillName;
}
