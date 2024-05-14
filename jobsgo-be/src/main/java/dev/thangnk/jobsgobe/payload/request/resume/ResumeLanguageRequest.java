package dev.thangnk.jobsgobe.payload.request.resume;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeLanguageRequest {
    private Long id;
    private Integer prowess;
    private Long languageId;
    private String languageName;
}
