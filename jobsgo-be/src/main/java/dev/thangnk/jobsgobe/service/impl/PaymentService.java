package dev.thangnk.jobsgobe.service.impl;

import dev.thangnk.jobsgobe.model.entity.PackageEntity;
import dev.thangnk.jobsgobe.model.entity.PaymentEntity;
import dev.thangnk.jobsgobe.model.entity.UserEntity;
import dev.thangnk.jobsgobe.payload.response.Response;
import dev.thangnk.jobsgobe.payload.response.payment.PaymentResponse;
import dev.thangnk.jobsgobe.repository.packagee.PackageRepository;
import dev.thangnk.jobsgobe.repository.payment.PaymentRepository;
import dev.thangnk.jobsgobe.repository.user.UserRepository;
import dev.thangnk.jobsgobe.service.iservice.PaymentIService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService implements PaymentIService {
    private final PackageRepository packageRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;

    public PaymentResponse getPaymentResponse(PaymentEntity paymentEntity){
        return PaymentResponse.builder()
                .id(paymentEntity.getId())
                .vnpTxnRef(paymentEntity.getVnpTxnRef())
                .dateCreate(paymentEntity.getDateCreate())
                .quantity(paymentEntity.getQuantity())
                .total(paymentEntity.getTotal())
                .status(paymentEntity.isStatus())
                .nameRecruiter(paymentEntity.getRecruiter().getName())
                .namePackage(paymentEntity.getPackageEntity().getName())
                .build();
    }
    @Override
    public Response<PaymentEntity> create(Long packageId, Long recruiterId,Integer quantity, Long total,String vnpTxnRef) {
        PackageEntity packageEntity = packageRepository.findById(packageId).orElse(null);
        UserEntity recruiter = userRepository.findById(recruiterId).orElse(null);
        PaymentEntity payment = PaymentEntity.builder()
                .vnpTxnRef(vnpTxnRef)
                .dateCreate(new Date())
                .quantity(quantity)
                .total(total)
                .status(false)
                .recruiter(recruiter)
                .packageEntity(packageEntity)
                .build();
        paymentRepository.save(payment);
        return Response.<PaymentEntity>builder()
                .setMessage("Create payment success")
                .setData(payment)
                .build();
    }

    @Override
    public Response<PaymentEntity> updateStatus(String vnpTxnRef, boolean status) {
        PaymentEntity payment = paymentRepository.findByVnpTxnRef(vnpTxnRef);
        payment.setStatus(status);
        paymentRepository.save(payment);
        return Response.<PaymentEntity>builder()
                .setMessage("Update status payment success")
                .setData(payment)
                .build();
    }

    @Override
    public Response<List<PaymentResponse>> showAllPayment() {
        List<PaymentResponse> listPayment = paymentRepository.findAll()
                .stream()
                .map(this::getPaymentResponse)
                .collect(Collectors.toList());
        return Response.<List<PaymentResponse>>builder()
                .setMessage("Success")
                .setData(listPayment)
                .build();
    }

    @Override
    //ByRecruiterId
    public Response<List<PaymentResponse>> showPaymentById(Long id) {
        List<PaymentResponse> listPaymentId = new ArrayList<>();
        UserEntity userEntity = userRepository.findById(id).orElse(null);
        if(userEntity != null){
            listPaymentId = paymentRepository.findByIdUser(id)
                    .stream()
                    .map(this::getPaymentResponse)
                    .collect(Collectors.toList());
            return Response.<List<PaymentResponse>>builder()
                    .setMessage("Success")
                    .setData(listPaymentId)
                    .build();
        }
        return Response.<List<PaymentResponse>>builder()
                .setMessage("Failed")
                .build();
    }

    @Override
    public void deleteByVnpTxnRef(String vnpTxnRef) {
        PaymentEntity payment = paymentRepository.findByVnpTxnRef(vnpTxnRef);
        paymentRepository.deleteById(payment.getId());
    }
}
