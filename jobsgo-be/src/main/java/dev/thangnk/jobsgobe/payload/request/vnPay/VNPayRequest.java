package dev.thangnk.jobsgobe.payload.request.vnPay;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class VNPayRequest {
    private Long packageId;
    private Long recruiterId;
    private Integer quantity;
    private String orderDesc;
    private String bankCode;
    private Long price;
}
