package dev.thangnk.jobsgobe.service.iservice;

import dev.thangnk.jobsgobe.payload.request.auth.AuthRequest;
import dev.thangnk.jobsgobe.payload.request.auth.RegisterRequest;
import dev.thangnk.jobsgobe.payload.response.BaseResponse;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.auth.AuthResponse;

public interface AuthIService {
    public Response<AuthResponse> authenticate(AuthRequest request);
    public Response<AuthResponse> authenticateGoogleAndFacebook(RegisterRequest request);
    public Response<BaseResponse> register(RegisterRequest request);
}
