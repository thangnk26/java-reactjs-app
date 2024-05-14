package dev.thangnk.jobsgobe.controller.email;

import dev.thangnk.jobsgobe.payload.request.EmailRequest;
import dev.thangnk.jobsgobe.service.impl.EmailSenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class EmailController {
    private final EmailSenderService emailSenderService;

    @PostMapping("/public/emails")
    public void sendEmail(@RequestBody EmailRequest request){
        emailSenderService.sendEmail(request);
    }
}
