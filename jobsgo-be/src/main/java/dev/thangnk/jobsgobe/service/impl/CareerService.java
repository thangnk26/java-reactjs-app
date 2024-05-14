package dev.thangnk.jobsgobe.service.impl;

import dev.thangnk.jobsgobe.model.entity.CareerEntity;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.repository.career.CareerRepository;
import dev.thangnk.jobsgobe.service.iservice.CareerIService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CareerService implements CareerIService {
    private final CareerRepository careerRepository;
    @Override
    public Response<List<CareerEntity>> getAll(int size) {
        List<CareerEntity> listCareer = new ArrayList<CareerEntity>();
        if(size != 0){
            Pageable pageable = PageRequest.of(0, size);
            listCareer = careerRepository.findTop(pageable);
        } else{
            listCareer = careerRepository.findAll();
        }
        return Response.<List<CareerEntity>>builder()
                .setMessage("Success")
                .setData(listCareer)
                .build();
    }
    @Override
    public Response<CareerEntity> createCareer(CareerEntity request) {
        List<CareerEntity> listCareer = careerRepository.findAll();
        for(CareerEntity career : listCareer){
            if(request.getName() == career.getName()){
                return Response.<CareerEntity>builder()
                        .setMessage("Kĩ năng đã tồn tại")
                        .setStatus(HttpStatus.BAD_REQUEST)
                        .setSuccess(false)
                        .setStatusCode(400)
                        .build();
            }else{
                CareerEntity softSkill1 = CareerEntity.builder()
                        .name(request.getName())
                        .build();
                careerRepository.save(softSkill1);
                return Response.<CareerEntity>builder()
                        .setMessage("Success")
                        .build();
            }
        }
        return null;
    }

    @Override
    public Response<CareerEntity> createCareer(Long id, CareerEntity request) {
        CareerEntity career = careerRepository.findById(id).orElse(null);
        if(career == null){
            return Response.<CareerEntity>builder()
                    .setMessage("Không tìm thấy")
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .setSuccess(false)
                    .setStatusCode(400)
                    .build();
        }
        career.setName(request.getName());
        careerRepository.save(career);
        return Response.<CareerEntity>builder()
                .setMessage("Success")
                .build();
    }
}
