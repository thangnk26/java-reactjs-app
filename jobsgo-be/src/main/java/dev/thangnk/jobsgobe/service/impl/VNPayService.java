package dev.thangnk.jobsgobe.service.impl;

import dev.thangnk.jobsgobe.config.ConfigVNPay;
import dev.thangnk.jobsgobe.payload.request.vnPay.VNPayRequest;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.vnPay.UrlResponse;
import dev.thangnk.jobsgobe.service.impl.usedPackage.UsedPackageService;
import dev.thangnk.jobsgobe.service.iservice.VNPayIService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class VNPayService implements VNPayIService {
    private final PaymentService paymentService;
    private final UsedPackageService usedPackageService;
    @Override
    public Response<UrlResponse> getUrlVnPay(VNPayRequest request, HttpServletRequest httpServletRequest) throws UnsupportedEncodingException {
        String vnp_Version = ConfigVNPay.vnp_Version;
        String vnp_Command = ConfigVNPay.vnp_Command;
        String orderType = ConfigVNPay.orderType;
        long amount = Integer.parseInt(request.getPrice().toString()) * 100;
        String bankCode = request.getBankCode();

        String vnp_TxnRef = ConfigVNPay.getRandomNumber(8);
        String vnp_TmnCode = ConfigVNPay.vnp_TmnCode;
//        String vnp_IpAddr = ConfigVNPay.getIpAddress(httpServletRequest);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");


        if (bankCode != null && !bankCode.isEmpty()) {
            vnp_Params.put("vnp_BankCode", bankCode);
        }
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = "vn";
        if (locate != null && !locate.isEmpty()) {
            vnp_Params.put("vnp_Locale", locate);
        } else {
            vnp_Params.put("vnp_Locale", "vn");
        }
        vnp_Params.put("vnp_ReturnUrl", ConfigVNPay.vnp_Returnurl);
        vnp_Params.put("vnp_IpAddr", "127.1.9.1");

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = ConfigVNPay.hmacSHA512(ConfigVNPay.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = ConfigVNPay.vnp_PayUrl + "?" + queryUrl;

        //Create Payment and used
        paymentService.create(request.getPackageId(), request.getRecruiterId(), request.getQuantity(), request.getPrice(), vnp_TxnRef);
        usedPackageService.create(request.getPackageId(), request.getRecruiterId(), vnp_TxnRef, request.getQuantity());

        return Response.<UrlResponse>builder()
                .setMessage("Get url VNPay success")
                .setData(UrlResponse.builder()
                        .urlVnPay(paymentUrl)
                        .build())
                .build();
    }

    @Override
    public void transaction(String vnp_responseCode, String vnpTxnRef,HttpServletResponse response) {
        if (vnp_responseCode.equals("00")) {
            try {
                paymentService.updateStatus(vnpTxnRef, true);
                usedPackageService.updateStatus(vnpTxnRef, true);
                response.sendRedirect("https://ddt-jobsgo.vercel.app/recruiter/buyPackage?status=ok");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } else {
            try {
                paymentService.deleteByVnpTxnRef(vnpTxnRef);
                usedPackageService.deleteByVnpTxnRef(vnpTxnRef);
                response.sendRedirect("https://ddt-jobsgo.vercel.app/recruiter/buyPackage?status=no");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
