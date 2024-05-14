package dev.thangnk.jobsgobe.controller.softSkill;

import dev.thangnk.jobsgobe.model.entity.SoftSkillEntity;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.service.impl.SoftSkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")

@RequiredArgsConstructor
public class SoftSkillController {
    private final SoftSkillService softSkillService;

    @GetMapping("/public/softSkills")
    public Response<List<SoftSkillEntity>> getAll() {
        return softSkillService.getAll();
    }
    @PostMapping("/admin/create-softskill")
    @Secured("ADMIN")
    public Response<SoftSkillEntity> createSoftskill(@RequestBody SoftSkillEntity request){
        Response<SoftSkillEntity> response = softSkillService.createSoftskill(request);
        return response;
    }
    @PutMapping("/admin/update-softskill/{id}")
    @Secured("ADMIN")
    public Response<SoftSkillEntity> updateSoftskill (@PathVariable Long id,@RequestBody SoftSkillEntity request){
        Response<SoftSkillEntity> response = softSkillService.updateSoftskill(id, request);
        return response;
    }
}
