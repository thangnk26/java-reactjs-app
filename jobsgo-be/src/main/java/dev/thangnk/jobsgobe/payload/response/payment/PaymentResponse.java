package dev.thangnk.jobsgobe.payload.response.payment;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@Builder
public class PaymentResponse {
    private Long id;
    private String vnpTxnRef;
    private Date dateCreate;
    private Integer quantity;
    private Long total;
    private boolean status;
    private String nameRecruiter;
    private String namePackage;
}
