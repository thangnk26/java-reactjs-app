package dev.thangnk.jobsgobe.payload.response.vnPay;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UrlResponse {
    private String urlVnPay;
}
