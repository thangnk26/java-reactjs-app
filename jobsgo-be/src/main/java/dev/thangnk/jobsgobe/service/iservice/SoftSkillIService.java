package dev.thangnk.jobsgobe.service.iservice;

import dev.thangnk.jobsgobe.model.entity.LanguageEntity;
import dev.thangnk.jobsgobe.model.entity.SoftSkillEntity;
import dev.thangnk.jobsgobe.payload.response.Response;

import java.util.List;

public interface SoftSkillIService {
    public Response<List<SoftSkillEntity>> getAll();
    Response<SoftSkillEntity> createSoftskill(SoftSkillEntity request);

    Response<SoftSkillEntity> updateSoftskill(Long id, SoftSkillEntity request);

}
