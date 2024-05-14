package dev.thangnk.jobsgobe.service.iservice;

import dev.thangnk.jobsgobe.payload.request.EmailRequest;

public interface EmailSenderIService {
    public void sendEmail(EmailRequest request);
}
