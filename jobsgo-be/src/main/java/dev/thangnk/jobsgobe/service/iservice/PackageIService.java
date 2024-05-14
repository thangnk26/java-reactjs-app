package dev.thangnk.jobsgobe.service.iservice;

import dev.thangnk.jobsgobe.payload.request.packagee.PackageRequest;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.packagee.PackageRespone;

import java.util.List;

public interface PackageIService {
    public Response<List<PackageRespone>> showAll();
    public Response<PackageRespone> showOnePackage(Long id);
    public Response<PackageRespone> create(PackageRequest request);
    public Response<PackageRespone> update(Long id, PackageRequest request);
    public void delete(Long id);
}
