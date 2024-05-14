package dev.thangnk.jobsgobe.controller.packagee;
import dev.thangnk.jobsgobe.payload.request.packagee.PackageRequest;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.packagee.PackageRespone;
import dev.thangnk.jobsgobe.service.impl.packagee.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api")
@CrossOrigin
@RequiredArgsConstructor
public class PackageController {
    private final PackageService packageService;
    @GetMapping("/packages")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<List<PackageRespone>>showAll(){
        Response<List<PackageRespone>> packResponse = packageService.showAll();
        return packResponse;
    }
    @GetMapping("package/{id}")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<PackageRespone> showOnePackage(@PathVariable Long id) {
        Response<PackageRespone> packResponse = packageService.showOnePackage(id);
        return packResponse;
    }

    @PostMapping("/package")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<PackageRespone> create(@RequestBody PackageRequest request) {
        Response<PackageRespone> packResponse = packageService.create(request);
        return packResponse;
    }

    @PutMapping("/package/update/{id}")
    @Secured({"RECRUITER", "ADMIN"})
    public Response<PackageRespone> update(@PathVariable Long id, @RequestBody PackageRequest request) {
        Response<PackageRespone> packResponse = packageService.update(id, request);
        return packResponse;
    }
    @DeleteMapping("/package-delete/{id}")
    @Secured({"RECRUITER", "ADMIN"})
    public void deleteById(@PathVariable Long id){
        packageService.delete(id);
    }
}

