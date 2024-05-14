package dev.thangnk.jobsgobe.controller.career;

import dev.thangnk.jobsgobe.model.entity.CareerEntity;
import dev.thangnk.jobsgobe.model.entity.LanguageEntity;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.service.impl.CareerService;
import dev.thangnk.jobsgobe.service.impl.LanguageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")

@RequiredArgsConstructor
public class CareerController {
    private final CareerService careerService;

    @GetMapping("/public/careers")
    public Response<List<CareerEntity>> getAll(@RequestParam int size) {
        return careerService.getAll(size);
    }

    @PostMapping("/admin/create-career")
    @Secured("ADMIN")
    public Response<CareerEntity> createCareer(@RequestBody CareerEntity request){
        Response<CareerEntity> response = careerService.createCareer(request);
        return response;
    }
    @PutMapping("/admin/update-career/{id}")
    @Secured("ADMIN")
    public Response<CareerEntity> updateCareer (@PathVariable Long id,@RequestBody CareerEntity request){
        Response<CareerEntity> response = careerService.createCareer(id, request);
        return response;
    }
}
