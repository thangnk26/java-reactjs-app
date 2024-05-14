package dev.thangnk.jobsgobe.service.iservice;

import dev.thangnk.jobsgobe.model.entity.LanguageEntity;
import dev.thangnk.jobsgobe.payload.response.Response;

import java.util.List;

public interface LanguageIService {
    public Response<List<LanguageEntity>> getAll();
    public Response<LanguageEntity> createLanguage(LanguageEntity entity);
    public Response<LanguageEntity> updateLanguage(Long id , LanguageEntity entity);

}
