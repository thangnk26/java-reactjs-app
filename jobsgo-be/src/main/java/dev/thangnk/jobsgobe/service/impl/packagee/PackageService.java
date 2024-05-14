package dev.thangnk.jobsgobe.service.impl.packagee;
import dev.thangnk.jobsgobe.model.entity.*;
import dev.thangnk.jobsgobe.payload.request.packagee.PackageRequest;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.packagee.PackageRespone;
import dev.thangnk.jobsgobe.repository.packagee.PackageRepository;
import dev.thangnk.jobsgobe.service.iservice.PackageIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class PackageService implements PackageIService {
    private final PackageRepository packageRepository;
    public PackageRespone getPackageResponse(PackageEntity packagee){
        return PackageRespone.builder()
                .id(packagee.getId())
                .name(packagee.getName())
                .image(packagee.getImage())
                .duration(packagee.getDuration())
                .price(packagee.getPrice())
                .discount(packagee.getDiscount())
                .description(packagee.getDescription())
                .date_create(packagee.getDate_create())
                .date_update(packagee.getDate_update())
                .typePackage(packagee.getTypePackage())
                .build();
    }
    @Override
    public Response<List<PackageRespone>> showAll() {
        List<PackageRespone> packageeRespones = packageRepository.findAll().stream().map(this::getPackageResponse).collect(Collectors.toList());
        return Response.<List<PackageRespone>>builder()
                .setData(packageeRespones)
                .build();
    }

    @Override
    public Response<PackageRespone> showOnePackage(Long id) {
        PackageEntity pack = packageRepository.findById(id).orElse(null);
        if(pack == null){
            return Response.<PackageRespone>builder()
                    .setMessage("Not found")
                    .setSuccess(false)
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .setStatusCode(400)
                    .build();
        }
        return Response.<PackageRespone>builder()
                .setData(getPackageResponse(pack))
                .build();
    }

    @Override
    public Response<PackageRespone> create(PackageRequest request) {
        PackageEntity pack = PackageEntity.builder()
                .name(request.getName())
                .image(request.getImage())
                .duration(request.getDuration())
                .price(request.getPrice())
                .discount(request.getDiscount())
                .description(request.getDescription())
                .date_create(new Date())
                .date_update(new Date())
                .typePackage(request.getTypePackage())
                .build();
        packageRepository.save(pack);
        return Response.<PackageRespone>builder()
                .setData(getPackageResponse(pack))
                .build();
    }

    @Override
    public Response<PackageRespone> update(Long id, PackageRequest request) {
        PackageEntity packOld = packageRepository.findById(id).orElse(null);
        if(packOld == null){
            return Response.<PackageRespone>builder()
                    .setMessage("Not found")
                    .setSuccess(false)
                    .setStatusCode(400)
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .build();
        }
        PackageEntity pack = PackageEntity.builder()
                .id(id)
                .name(request.getName())
                .image(request.getImage())
                .duration(request.getDuration())
                .price(request.getPrice())
                .discount(request.getDiscount())
                .description(request.getDescription())
                .date_create(request.getDate_create())
                .date_update(request.getDate_update())
                .typePackage(request.getTypePackage())
                .build();

        packageRepository.save(pack);
        return Response.<PackageRespone>builder()
                .setStatus(HttpStatus.CREATED)
                .setStatusCode(201)
                .setSuccess(true)
                .setData(getPackageResponse(pack))
                .build();
    }

    @Override
    public void delete(Long id) {
        packageRepository.deleteById(id);
    }
}
