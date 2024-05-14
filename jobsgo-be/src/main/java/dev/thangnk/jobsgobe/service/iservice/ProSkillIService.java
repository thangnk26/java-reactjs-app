package dev.thangnk.jobsgobe.service.iservice;

import dev.thangnk.jobsgobe.model.entity.LanguageEntity;
import dev.thangnk.jobsgobe.model.entity.ProSkillEntity;
import dev.thangnk.jobsgobe.payload.request.proskill.ProskillRequest;
import dev.thangnk.jobsgobe.payload.response.Response;

import java.util.List;

public interface ProSkillIService {
    public Response<List<ProSkillEntity>> getAll();
    public Response<ProSkillEntity> createProskill(ProskillRequest request);
    public Response<ProSkillEntity> updateProskill(Long id, ProskillRequest request);

}
