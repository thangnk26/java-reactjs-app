package dev.thangnk.jobsgobe.controller.vnPay;

import dev.thangnk.jobsgobe.payload.request.vnPay.VNPayRequest;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.vnPay.UrlResponse;
import dev.thangnk.jobsgobe.service.impl.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class VnPayController {
    private final VNPayService vnPayService;

    @PostMapping("/vnPay/url")
    @Secured("RECRUITER")
    public Response<UrlResponse> getUrlVnPay(@RequestBody VNPayRequest request, HttpServletRequest httpServletRequest) {
        try {
            return vnPayService.getUrlVnPay(request, httpServletRequest);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/public/vnPay/info")
    public void transaction(
            @RequestParam(value = "vnp_ResponseCode") String responseCode,
            @RequestParam(value = "vnp_TxnRef") String vnpTxnRef,
            HttpServletResponse response
    ) {
        vnPayService.transaction(responseCode, vnpTxnRef,response);
    }
}
