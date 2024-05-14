package dev.thangnk.jobsgobe.service.iservice;

import dev.thangnk.jobsgobe.model.entity.CareerEntity;
import dev.thangnk.jobsgobe.model.entity.SoftSkillEntity;
import dev.thangnk.jobsgobe.payload.response.Response;

import java.util.List;

public interface CareerIService {
    public Response<List<CareerEntity>> getAll(int size);
    Response<CareerEntity> createCareer(CareerEntity request);

    Response<CareerEntity> createCareer(Long id, CareerEntity request);

}
