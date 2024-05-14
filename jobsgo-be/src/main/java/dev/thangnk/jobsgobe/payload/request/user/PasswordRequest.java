package dev.thangnk.jobsgobe.payload.request.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PasswordRequest {
    private String OldPassword;
    private String newPassword;
}
