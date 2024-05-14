package dev.thangnk.jobsgobe.service.impl.attachments;

import dev.thangnk.jobsgobe.model.entity.AttachmentsEntity;
import dev.thangnk.jobsgobe.model.entity.UserEntity;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.repository.resume.AttachmentsRepository;
import dev.thangnk.jobsgobe.repository.user.UserRepository;
import dev.thangnk.jobsgobe.service.iservice.AttachmentsIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttachmentsService implements AttachmentsIService {
    private final AttachmentsRepository attachmentsRepository;
    private final UserRepository userRepository;
    @Override
    public Response<AttachmentsEntity> create(Long id,AttachmentsEntity request) {
        UserEntity candidate = userRepository.findById(id).orElse(null);
        if(candidate != null){
            AttachmentsEntity attachmentsEntity = AttachmentsEntity.builder()
                    .name(request.getName())
                    .url(request.getUrl())
                    .candidate(candidate)
                    .build();
            attachmentsRepository.save(attachmentsEntity);
            return Response.<AttachmentsEntity>builder()
                    .setData(attachmentsEntity)
                    .build();
        }
        return Response.<AttachmentsEntity>builder()
                .setData(null)
                .setMessage("Upload failed")
                .setSuccess(false)
                .setStatus(HttpStatus.BAD_REQUEST)
                .setStatusCode(400)
                .build();
    }

    @Override
    public Response<List<AttachmentsEntity>> getAttachmentsByCandidateId(Long id) {
        List<AttachmentsEntity> listAttachments = attachmentsRepository.getAttachmentsByCandidateId(id);
        return Response.<List<AttachmentsEntity>>builder()
                .setData(listAttachments)
                .build();
    }

    @Override
    public Response<AttachmentsEntity> update(Long id, AttachmentsEntity request) {
        AttachmentsEntity attachmentsEntity = attachmentsRepository.findById(id).orElse(null);
        if(attachmentsEntity != null){
            attachmentsEntity.setName(request.getName());
            attachmentsEntity.setUrl(request.getUrl());
            attachmentsRepository.save(attachmentsEntity);
            return Response.<AttachmentsEntity>builder()
                    .setData(attachmentsEntity)
                    .build();
        }
        return Response.<AttachmentsEntity>builder()
                .setData(null)
                .setMessage("Update failed")
                .setSuccess(false)
                .setStatus(HttpStatus.BAD_REQUEST)
                .setStatusCode(400)
                .build();
    }

    @Override
    public void deleteById(Long id) {
        attachmentsRepository.deleteById(id);
    }
}
