package dev.thangnk.jobsgobe.controller.resume;

import dev.thangnk.jobsgobe.payload.request.resume.ResumeRequest;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.resume.ResumeResponse;
import dev.thangnk.jobsgobe.service.impl.resume.ResumeService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")

@RequiredArgsConstructor
public class ResumeController {
    private final ResumeService resumeService;

    @GetMapping("/public/resumes")
    public Response<List<ResumeResponse>> showAll(){
        Response<List<ResumeResponse>> listResponse = resumeService.showAll();
        return listResponse;
    }

    @GetMapping("/resumes/candidate/{id}")
    @Secured("CANDIDATE")
    public Response<List<ResumeResponse>> showAllByCandidateId(@PathVariable Long id){
        Response<List<ResumeResponse>> listResponse = resumeService.showAllByCandidateId(id);
        return listResponse;
    }
    @GetMapping("/resumes/{id}")
    @Secured({"CANDIDATE", "RECRUITER", "ADMIN"})
    public Response<ResumeResponse> showOneResume(@PathVariable Long id) {
        Response<ResumeResponse> resumeResponse = resumeService.showOneResume(id);
        return resumeResponse;
    }

    @PostMapping("/resumes")
    @Secured("CANDIDATE")
    public Response<ResumeResponse> create(@RequestBody ResumeRequest request) {
        Response<ResumeResponse> resumeResponse = resumeService.create(request);
        return resumeResponse;
    }

    @PutMapping("/resumes/{id}")
    @Secured("CANDIDATE")
    public  Response<ResumeResponse> update(@PathVariable Long id, @RequestBody ResumeRequest request){
        Response<ResumeResponse> resumeResponse = resumeService.update(id, request);
        return resumeResponse;
    }
    @PutMapping("/resumes/{id}/template/{template}")
    @Secured("CANDIDATE")
    public  void changeTemplate(@PathVariable Long id, @PathVariable Integer template){
        resumeService.changeTemplate(id, template);
    }
    @PutMapping("/resumes/{id}/public/{status}")
    @Secured("CANDIDATE")
    public  void changeIsPublic(@PathVariable Long id, @PathVariable boolean status){
        resumeService.changeIsPublic(id, status);
    }
    @DeleteMapping("/resumes/{id}")
    @Secured("CANDIDATE")
    public  Response<ResumeResponse> delete(@PathVariable Long id){
        Response<ResumeResponse> resumeResponse = resumeService.delete(id);
        return resumeResponse;
    }

    @GetMapping("/public/resumes/search")
    public Response<List<ResumeResponse>> searchCandidate(@RequestParam(name = "position", required = false) String position,
                                                          @RequestParam(name = "specialized", required = false) String specialized,@RequestParam(name = "language", required = false) String language,@RequestParam(name = "degree", required = false) String degree){
        return resumeService.searchCandidate(position, specialized,language,degree);
    }

//    @DeleteMapping("/resumes/proSkill/{id}")
//    @Secured("CANDIDATE")
//    public void deleteProSkill(@PathVariable Long id){
//        resumeService.deleteResumeProSkillById(id);
//    }
//
//    @DeleteMapping("/resumes/workExp/{id}")
//    @Secured("CANDIDATE")
//    public void deleteWorkExp(@PathVariable Long id){
//        resumeService.deleteResumeWorkExpById(id);
//    }
//
//    @DeleteMapping("/resumes/education/{id}")
//    @Secured("CANDIDATE")
//    public void deleteResumeEducation(@PathVariable Long id){
//        resumeService.deleteResumeEducationById(id);
//    }
//
//    @DeleteMapping("/resumes/language/{id}")
//    @Secured("CANDIDATE")
//    public void deleteResumeLanguage(@PathVariable Long id){
//        resumeService.deleteResumeLanguageById(id);
//    }
//
//    @DeleteMapping("/resumes/softSkill/{id}")
//    @Secured("CANDIDATE")
//    public void deleteResumeSoftSkill(@PathVariable Long id){
//        resumeService.deleteResumeSoftSkillById(id);
//    }
//
//    @DeleteMapping("/resumes/hobby/{id}")
//    @Secured("CANDIDATE")
//    public void deleteResumeHobby(@PathVariable Long id){
//        resumeService.deleteResumeHobbyById(id);
//    }

}
