package dev.thangnk.jobsgobe.service.impl;

import dev.thangnk.jobsgobe.model.entity.ProSkillEntity;
import dev.thangnk.jobsgobe.model.entity.SoftSkillEntity;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.repository.softSkill.SoftSkillRepository;
import dev.thangnk.jobsgobe.service.iservice.SoftSkillIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SoftSkillService implements SoftSkillIService {
    private final SoftSkillRepository softSkillRepository;
    @Override
    public Response<List<SoftSkillEntity>> getAll() {
        List<SoftSkillEntity> listSoftSkill = softSkillRepository.findAll();
        return Response.<List<SoftSkillEntity>>builder()
                .setMessage("Success")
                .setData(listSoftSkill)
                .build();
    }

    @Override
    public Response<SoftSkillEntity> createSoftskill(SoftSkillEntity request) {
        List<SoftSkillEntity> listSoftskill = softSkillRepository.findAll();
        for(SoftSkillEntity softskill : listSoftskill){
            if(request.getName() == softskill.getName()){
                return Response.<SoftSkillEntity>builder()
                        .setMessage("Kĩ năng đã tồn tại")
                        .setStatus(HttpStatus.BAD_REQUEST)
                        .setSuccess(false)
                        .setStatusCode(400)
                        .build();
            }else{
                SoftSkillEntity softSkill1 = SoftSkillEntity.builder()
                        .name(request.getName())
                        .build();
                softSkillRepository.save(softSkill1);
                return Response.<SoftSkillEntity>builder()
                        .setMessage("Success")
                        .build();
            }
        }
        return null;
    }

    @Override
    public Response<SoftSkillEntity> updateSoftskill(Long id, SoftSkillEntity request) {
        SoftSkillEntity softskill = softSkillRepository.findById(id).orElse(null);
        if(softskill == null){
            return Response.<SoftSkillEntity>builder()
                    .setMessage("Không tìm thấy")
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .setSuccess(false)
                    .setStatusCode(400)
                    .build();
        }
        softskill.setName(request.getName());
        softSkillRepository.save(softskill);
        return Response.<SoftSkillEntity>builder()
                .setMessage("Success")
                .build();
    }
}
