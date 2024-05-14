package dev.thangnk.jobsgobe.controller.payment;

import dev.thangnk.jobsgobe.model.entity.PaymentEntity;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.payment.PaymentResponse;
import dev.thangnk.jobsgobe.service.impl.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    @GetMapping("/payments")
    public Response<List<PaymentResponse>> showAllPayment(){
        Response<List<PaymentResponse>> paymentResponse = paymentService.showAllPayment();
        return  paymentResponse;
    }
    @GetMapping("/payments/recruiter/{id}")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<List<PaymentResponse>> showPaymentById(@PathVariable Long id){
        Response<List<PaymentResponse>>paymentResponse = paymentService.showPaymentById(id);
        return paymentResponse;

    }
}
