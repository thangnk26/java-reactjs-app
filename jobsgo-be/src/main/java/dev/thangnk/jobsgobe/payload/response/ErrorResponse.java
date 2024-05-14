package dev.thangnk.jobsgobe.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Getter
@Setter
@Builder(setterPrefix = "set")
public class ErrorResponse {
    private HttpStatus status;
    private Map<String, String> errors;
}
