package dev.thangnk.jobsgobe.payload.response.resume;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeSoftSkillResponse {
    private Long id;
    private Integer prowess;
    private Long softSkillId;
    private String softSkillName;
}
