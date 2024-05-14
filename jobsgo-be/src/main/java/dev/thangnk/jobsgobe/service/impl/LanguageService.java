package dev.thangnk.jobsgobe.service.impl;

import dev.thangnk.jobsgobe.model.entity.LanguageEntity;
import dev.thangnk.jobsgobe.model.entity.ProSkillEntity;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.repository.language.LanguageRepository;
import dev.thangnk.jobsgobe.service.iservice.LanguageIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LanguageService implements LanguageIService {
    private final LanguageRepository languageRepository;
    @Override
    public Response<List<LanguageEntity>> getAll() {
        List<LanguageEntity> listLanguage = languageRepository.findAll();
        return Response.<List<LanguageEntity>>builder()
                .setMessage("Success")
                .setData(listLanguage)
                .build();
    }

    @Override
    public Response<LanguageEntity> createLanguage(LanguageEntity entity) {
        List<LanguageEntity> listLanguage = languageRepository.findAll();
        for(LanguageEntity language : listLanguage){
            if(entity.getName() == language.getName()){
                return Response.<LanguageEntity>builder()
                        .setMessage("Ngôn ngữ đã tồn tại")
                        .setStatus(HttpStatus.BAD_REQUEST)
                        .setSuccess(false)
                        .setStatusCode(400)
                        .build();
            }else{
                LanguageEntity language1 = LanguageEntity.builder()
                        .name(entity.getName())
                        .build();
                languageRepository.save(language1);
                return Response.<LanguageEntity>builder()
                        .setMessage("Success")
                        .build();
            }
        }
        return null;
    }

    @Override
    public Response<LanguageEntity> updateLanguage(Long id ,LanguageEntity entity) {
        LanguageEntity language = languageRepository.findById(id).orElse(null);
        if(language == null){
            return Response.<LanguageEntity>builder()
                    .setMessage("Không tìm thấy")
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .setSuccess(false)
                    .setStatusCode(400)
                    .build();
        }
        language.setName(entity.getName());
        languageRepository.save(language);
        return Response.<LanguageEntity>builder()
                .setMessage("Success")
                .build();
    }
}
