package dev.thangnk.jobsgobe.service.iservice;

import dev.thangnk.jobsgobe.payload.request.vnPay.VNPayRequest;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.vnPay.UrlResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.UnsupportedEncodingException;

public interface VNPayIService {
    public Response<UrlResponse> getUrlVnPay(VNPayRequest request, HttpServletRequest httpServletRequest) throws UnsupportedEncodingException;
    public void transaction(String vnp_responseCode, String vnpTxnRef,HttpServletResponse response);
}
