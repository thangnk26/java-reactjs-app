package dev.thangnk.jobsgobe.converter;

import dev.thangnk.jobsgobe.payload.response.BaseResponse;
import dev.thangnk.jobsgobe.payload.response.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
@Slf4j
public class BaseConverter {
    public Response<BaseResponse> successResponse(Long id, String name, String email) {
        return Response.<BaseResponse>builder()
                .setMessage("Create/Update successful")
                .setData(BaseResponse.builder()
                        .id(id)
                        .name(name)
                        .email(email)
                        .build())
                .build();
    }

    public <R> Response<List<R>> successGetListR(List<R> responses) {
        return Response.<List<R>>builder()
                .setData(responses)
                .build();
    }

    public <R> Response<R> successGetR(R response) {
        return Response.<R>builder()
                .setData(response)
                .build();
    }
}
