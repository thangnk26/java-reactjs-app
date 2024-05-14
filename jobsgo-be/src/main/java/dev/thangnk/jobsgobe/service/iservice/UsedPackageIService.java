package dev.thangnk.jobsgobe.service.iservice;

import dev.thangnk.jobsgobe.model.entity.UsedPackageEntity;
import dev.thangnk.jobsgobe.payload.response.Response;

public interface UsedPackageIService {
    public Response<UsedPackageEntity> create(Long packageId, Long recruiterId, String vnpTxnRef, Integer quantity);
    public Response<UsedPackageEntity> updateStatus(String vnpTxnRef, boolean status);
    public Response<UsedPackageEntity> checkUsedPackage(Long id);
    public void cancelAllPackageByRecruiterId(Long id);
    public void deleteByVnpTxnRef(String vnpTxnRef);
}
