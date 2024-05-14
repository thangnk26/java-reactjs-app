package dev.thangnk.jobsgobe.controller.language;

import dev.thangnk.jobsgobe.model.entity.LanguageEntity;
import dev.thangnk.jobsgobe.model.entity.SoftSkillEntity;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.service.impl.LanguageService;
import dev.thangnk.jobsgobe.service.impl.SoftSkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")

@RequiredArgsConstructor
public class LanguageController {
    private final LanguageService languageService;

    @GetMapping("/public/languages")
    public Response<List<LanguageEntity>> getAll() {
        return languageService.getAll();
    }
    @PostMapping("/admin/create-language")
    @Secured("ADMIN")
    public Response<LanguageEntity> createLanguage(@RequestBody LanguageEntity request){
        Response<LanguageEntity> response = languageService.createLanguage(request);
        return response;
    }
    @PutMapping("/admin/update-language/{id}")
    @Secured("ADMIN")
    public Response<LanguageEntity> updateLanguage (@PathVariable Long id,@RequestBody LanguageEntity request){
        Response<LanguageEntity> response = languageService.updateLanguage(id, request);
        return response;
    }
}
