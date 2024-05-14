package dev.thangnk.jobsgobe.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@Builder(setterPrefix = "set")
public class Response<T> {
    @Builder.Default
    private boolean success = true;
    private String message;
    @Builder.Default
    private HttpStatus status = HttpStatus.OK;
    @Builder.Default
    private int statusCode = HttpStatus.OK.value();
    private T data;
}
