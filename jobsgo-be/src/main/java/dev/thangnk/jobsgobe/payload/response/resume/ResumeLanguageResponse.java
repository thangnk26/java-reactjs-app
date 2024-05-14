package dev.thangnk.jobsgobe.payload.response.resume;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeLanguageResponse {
    private Long id;
    private Integer prowess;
    private Long languageId;
    private String languageName;
}
