package dev.thangnk.jobsgobe.service.impl.usedPackage;

import dev.thangnk.jobsgobe.model.entity.PackageEntity;
import dev.thangnk.jobsgobe.model.entity.UsedPackageEntity;
import dev.thangnk.jobsgobe.model.entity.UserEntity;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.repository.packagee.PackageRepository;
import dev.thangnk.jobsgobe.repository.usedPackage.UsedPackageRepository;
import dev.thangnk.jobsgobe.repository.user.UserRepository;
import dev.thangnk.jobsgobe.service.iservice.UsedPackageIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class UsedPackageService implements UsedPackageIService {
    private final UsedPackageRepository usedPackageRepository;
    private final PackageRepository packageRepository;
    private final UserRepository userRepository;

    public Date getExpiredDate(Date date, int duration) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DATE, duration);
        return c.getTime();
    }
    @Override
    public Response<UsedPackageEntity> create(Long packageId, Long recruiterId, String vnpTxnRef, Integer quantity) {
        PackageEntity packageEntity = packageRepository.findById(packageId).orElse(null);
        UserEntity recruiter = userRepository.findById(recruiterId).orElse(null);

        UsedPackageEntity usedPackageEntity = UsedPackageEntity.builder()
                .date_start(new Date())
                .date_end(getExpiredDate(new Date(), packageEntity.getDuration() * quantity))
                .status(false)
                .vnpTxnRef(vnpTxnRef)
                .recruiter(recruiter)
                .packageEntity(packageEntity)
                .build();
        usedPackageRepository.save(usedPackageEntity);
        return Response.<UsedPackageEntity>builder()
                .setData(usedPackageEntity)
                .setMessage("create used success")
                .build();
    }

    @Override
    public Response<UsedPackageEntity> updateStatus(String vnpTxnRef, boolean status) {
        UsedPackageEntity usedPackageEntity = usedPackageRepository.findByVnpTxnRef(vnpTxnRef);
        usedPackageEntity.setStatus(status);
        usedPackageRepository.save(usedPackageEntity);
        return Response.<UsedPackageEntity>builder()
                .setData(usedPackageEntity)
                .setMessage("update used success")
                .build();
    }

    @Override
    public Response<UsedPackageEntity> checkUsedPackage(Long id) {
        UserEntity recruiter = userRepository.findById(id).orElse(null);
        Date now = new Date();
        for (UsedPackageEntity usedPackageEntity: recruiter.getListUsedPackage()) {
            if(usedPackageEntity.isStatus() == true
                    && now.compareTo(usedPackageEntity.getDate_start()) >= 0
                    && now.compareTo(usedPackageEntity.getDate_end()) <= 0) {
                return Response.<UsedPackageEntity>builder()
                        .setData(usedPackageEntity)
                        .setMessage("Used")
                        .build();
            } else {
                usedPackageEntity.setStatus(false);
                usedPackageRepository.save(usedPackageEntity);
            }
        }
        return Response.<UsedPackageEntity>builder()
                .setSuccess(false)
                .setStatusCode(400)
                .setStatus(HttpStatus.BAD_REQUEST)
                .setMessage("No used")
                .build();
    }

    @Override
    public void cancelAllPackageByRecruiterId(Long id) {
        UserEntity recruiter = userRepository.findById(id).orElse(null);
        for (UsedPackageEntity usedPackageEntity: recruiter.getListUsedPackage()) {
                usedPackageEntity.setStatus(false);
                usedPackageRepository.save(usedPackageEntity);
        }
    }

    @Override
    public void deleteByVnpTxnRef(String vnpTxnRef) {
        UsedPackageEntity usedPackage = usedPackageRepository.findByVnpTxnRef(vnpTxnRef);
        usedPackageRepository.deleteById(usedPackage.getId());
    }
}
