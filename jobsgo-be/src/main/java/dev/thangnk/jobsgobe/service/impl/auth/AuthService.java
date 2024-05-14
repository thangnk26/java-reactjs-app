package dev.thangnk.jobsgobe.service.impl.auth;

import dev.thangnk.jobsgobe.common.constants.EmailDefault;
import dev.thangnk.jobsgobe.common.enums.Role;
import dev.thangnk.jobsgobe.model.entity.UserEntity;
import dev.thangnk.jobsgobe.payload.request.auth.AuthRequest;
import dev.thangnk.jobsgobe.payload.request.auth.RegisterRequest;
import dev.thangnk.jobsgobe.payload.response.BaseResponse;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.auth.AuthResponse;
import dev.thangnk.jobsgobe.repository.user.UserRepository;
import dev.thangnk.jobsgobe.security.jwt.JwtService;
import dev.thangnk.jobsgobe.service.iservice.AuthIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService implements AuthIService {
    private final AuthenticationManager authManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public Response<AuthResponse> authenticate(AuthRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        UserEntity user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user == null) {
            return Response.<AuthResponse>builder()
                    .setMessage("Email không tồn tại")
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .setSuccess(false)
                    .setStatusCode(400)
                    .build();
        }

        if (!passwordEncoder.matches(request.getPassword().trim(), user.getPassword())) {
            return Response.<AuthResponse>builder()
                    .setMessage("Mật khẩu không chính xác")
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .setSuccess(false)
                    .setStatusCode(400)
                    .build();
        }

        authManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        ));
        String accessToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        return Response.<AuthResponse>builder()
                .setMessage("Login successful")
                .setData(AuthResponse.builder()
                        .setAccessToken(accessToken)
                        .setRefreshToken(refreshToken)
                        .setName(user.getName())
                        .setUserId(user.getId())
                        .setEmail(user.getEmail())
                        .setImage(user.getImage())
                        .setRoles(List.of(user.getRole().name()))
                        .build())
                .build();
    }

    @Override
    public Response<AuthResponse> authenticateGoogleAndFacebook(RegisterRequest request) {
        UserEntity user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user != null) {
            String accessToken = jwtService.generateToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);
            return Response.<AuthResponse>builder()
                    .setMessage("Login successful")
                    .setData(AuthResponse.builder()
                            .setAccessToken(accessToken)
                            .setRefreshToken(refreshToken)
                            .setName(user.getName())
                            .setUserId(user.getId())
                            .setEmail(user.getEmail())
                            .setImage(user.getImage())
                            .setRoles(List.of(user.getRole().name()))
                            .build())
                    .build();
        } else {
            UserEntity userRegister = UserEntity.builder()
                    .email(request.getEmail().trim().toLowerCase())
                    .name(request.getName())
                    .role(Role.of(request.getRole()))
                    .build();
            userRepository.save(userRegister);

            String accessToken = jwtService.generateToken(userRegister);
            String refreshToken = jwtService.generateRefreshToken(userRegister);
            return Response.<AuthResponse>builder()
                    .setMessage("Login successful")
                    .setData(AuthResponse.builder()
                            .setAccessToken(accessToken)
                            .setRefreshToken(refreshToken)
                            .setName(userRegister.getName())
                            .setUserId(userRegister.getId())
                            .setEmail(userRegister.getEmail())
                            .setImage(userRegister.getImage())
                            .setRoles(List.of(userRegister.getRole().name()))
                            .build())
                    .build();
        }
    }


    public Response<BaseResponse> register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return Response.<BaseResponse>builder()
                    .setMessage("Email đã tồn tại")
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .setSuccess(false)
                    .setStatusCode(400)
                    .build();
        }
        UserEntity user = UserEntity.builder()
                .createAt(new Date())
                .email(request.getEmail().trim().toLowerCase())
                .password(passwordEncoder.encode(request.getPassword().trim()))
                .name(request.getName())
                .role(Role.of(request.getRole()))
                .build();
        if (request.getRole().equals("RECRUITER") || request.getRole().equals("ADMIN")) {
            user.setEmailCompany(request.getEmail());
        }

        if(request.getRole().equals("RECRUITER")){
            user.setContentEmailAccept(EmailDefault.accept);
            user.setContentEmailDenied(EmailDefault.denied);
        }
        userRepository.save(user);
        return Response.<BaseResponse>builder()
                .setData(BaseResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .name(user.getName())
                        .build())
                .build();
    }
}
