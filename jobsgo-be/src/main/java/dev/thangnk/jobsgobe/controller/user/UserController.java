package dev.thangnk.jobsgobe.controller.user;

import dev.thangnk.jobsgobe.model.entity.UserEntity;
import dev.thangnk.jobsgobe.payload.request.user.CandidateRequest;
import dev.thangnk.jobsgobe.payload.request.user.MailRequest;
import dev.thangnk.jobsgobe.payload.request.user.PasswordRequest;
import dev.thangnk.jobsgobe.payload.request.user.RecruiterRequest;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.service.impl.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/public/user/{id}")
    public Response<UserEntity> getOneUser(@PathVariable Long id) {
        return userService.getOneUser(id);
    }
    @GetMapping("/public/admin")
    public Response<UserEntity> getAdmin() {
        return userService.getAdmin();
    }
    @GetMapping("/public/user/email/{email}")
    public Response<UserEntity> getOneUserByEmail(@PathVariable String email) {
        return userService.getOneUserByEmail(email);
    }

    @GetMapping("/public/recruiters")
    public Response<List<UserEntity>> getAllRecruiter() {
        return userService.getAllRecruiter();
    }
    @GetMapping("/public/recruiters/featured")
    public Response<List<UserEntity>> getAllRecruiterFeatured() {
        return userService.getAllRecruiterFeatured();
    }
    @PutMapping("/users/changePassword/{id}")
    @Secured({"CANDIDATE", "RECRUITER", "ADMIN"})
    public Response<UserEntity> changePassword(@PathVariable Long id, @RequestBody PasswordRequest request) {
        return userService.changePassword(id, request);
    }
    @PutMapping("/users/recruiter/{id}")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<UserEntity> updateRecruiter(@PathVariable Long id, @RequestBody RecruiterRequest request) {
        return userService.updateRecruiter(id, request);
    }
    @PutMapping("/users/candidate/{id}")
    @Secured("CANDIDATE")
    public Response<UserEntity> updateCandidate(@PathVariable Long id, @RequestBody CandidateRequest request) {
        return userService.updateCandidate(id, request);
    }
    @GetMapping("/public/users/forgotPassword/email/{email}")
    public Response<UserEntity> forgotPassword(@PathVariable String email) {
        return userService.forgotPassword(email);
    }

    @GetMapping("/public/searchRecruiter")
    public Response<List<UserEntity>> searchRecruiter(@RequestParam(name="keyword")String keyword){
        return userService.searchRecruiter(keyword);
    }

    @PutMapping("/users/recruiter-lock/{id}")
    @Secured("ADMIN")
    public Response<UserEntity> disableUser(@PathVariable Long id){
        Response<UserEntity> userResponse = userService.disableUser(id);
        return  userResponse;
    }
    @GetMapping("/public/candidates")
    public Response<List<UserEntity>> getAllCandidate() {
        return userService.getAllCandidate();
    }

    @PutMapping ("/recruiter/acceptMail/{id}")
    @Secured("RECRUITER")
    public Response<UserEntity> updateContentEmail(@PathVariable Long id,@RequestBody MailRequest request){
        Response<UserEntity> response = userService.updateContentEmail(id, request);
        return  response;
    }

    @GetMapping ("/recruiter/mail/{id}")
    @Secured("RECRUITER")
    public Response<UserEntity> getContentEmail(@PathVariable Long id){
        Response<UserEntity> response = userService.getContentEmail(id);
        return  response;
    }
}
