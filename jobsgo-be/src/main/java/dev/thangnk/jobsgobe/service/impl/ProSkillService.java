package dev.thangnk.jobsgobe.service.impl;

import dev.thangnk.jobsgobe.model.entity.CareerEntity;
import dev.thangnk.jobsgobe.model.entity.ProSkillEntity;
import dev.thangnk.jobsgobe.payload.request.proskill.ProskillRequest;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.repository.career.CareerRepository;
import dev.thangnk.jobsgobe.repository.proSkill.ProSkillRepository;
import dev.thangnk.jobsgobe.service.iservice.ProSkillIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProSkillService implements ProSkillIService {
    private final ProSkillRepository proSkillRepository;
    private final CareerRepository careerRepository;

    @Override
    public Response<List<ProSkillEntity>> getAll() {
        List<ProSkillEntity> listProSkill = proSkillRepository.findAll();
        return Response.<List<ProSkillEntity>>builder()
                .setMessage("Success")
                .setData(listProSkill)
                .build();
    }

    @Override
    public Response<ProSkillEntity> createProskill(ProskillRequest request) {
        List<ProSkillEntity> listProskill = proSkillRepository.findAll();
        for(ProSkillEntity proskill : listProskill){
            if(request.getName() == proskill.getName()){
                return Response.<ProSkillEntity>builder()
                        .setMessage("Kĩ năng đã tồn tại")
                        .setStatus(HttpStatus.BAD_REQUEST)
                        .setSuccess(false)
                        .setStatusCode(400)
                        .build();
            }else{
                CareerEntity careerEntity = careerRepository.findById(request.getCareerId()).orElse(null);
                if(careerEntity != null){
                    ProSkillEntity proSkillEntity = ProSkillEntity.builder()
                            .name(request.getName())
                            .career(careerEntity)
                            .build();
                    proSkillRepository.save(proSkillEntity);
                }
                return Response.<ProSkillEntity>builder()
                        .setMessage("Không tìm thấy chuyên ngành phù hợp")
                        .setStatus(HttpStatus.BAD_REQUEST)
                        .setSuccess(false)
                        .setStatusCode(400)
                        .build();
            }
        }
        return null;
    }

    @Override
    public Response<ProSkillEntity> updateProskill(Long id, ProskillRequest request) {
        ProSkillEntity proSkillEntity = proSkillRepository.findById(id).orElse(null);
        if(proSkillEntity == null){
            return Response.<ProSkillEntity>builder()
                    .setMessage("Không tìm thấy kĩ năng")
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .setSuccess(false)
                    .setStatusCode(400)
                    .build();
        }
        CareerEntity careerEntity = careerRepository.findById(request.getCareerId()).orElse(null);
        if(careerEntity == null){
            return Response.<ProSkillEntity>builder()
                    .setMessage("Không tìm thấy chuyên ngành phù hợp")
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .setSuccess(false)
                    .setStatusCode(400)
                    .build();
        }
        proSkillEntity.setName(request.getName());
        proSkillEntity.setCareer(careerEntity);
        proSkillRepository.save(proSkillEntity);
        return Response.<ProSkillEntity>builder()
                .setMessage("Success")
                .build();
    }
}
