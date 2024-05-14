package dev.thangnk.jobsgobe.payload.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class EmailRequest {
    private String toEmail;
    private String subject;
    private String body;
}
