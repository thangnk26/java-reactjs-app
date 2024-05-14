package dev.thangnk.jobsgobe.service.impl;

import dev.thangnk.jobsgobe.payload.request.EmailRequest;
import dev.thangnk.jobsgobe.service.iservice.EmailSenderIService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailSenderService implements EmailSenderIService {
    private final JavaMailSender mailSender;

    @Override
    public void sendEmail(EmailRequest request) {


        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        String htmlMsg = request.getBody();
        try {
            helper.setText(htmlMsg, true); // Use this or above line.
            helper.setTo(request.getToEmail());
            helper.setSubject(request.getSubject());
            helper.setFrom("kimthang.2612@gmail.com");

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
