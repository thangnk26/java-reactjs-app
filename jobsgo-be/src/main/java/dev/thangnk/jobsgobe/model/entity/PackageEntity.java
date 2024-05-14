package dev.thangnk.jobsgobe.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_package")
public class PackageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String image;
    private Integer duration;
    private Double price;
    private Double discount;
    private String description;
    private Integer typePackage;
    private Date date_create;
    private Date date_update;

    //Relationship
    @OneToMany(targetEntity = PaymentEntity.class, mappedBy = "packageEntity")
    private Set<PaymentEntity> listPayment;//for payment

    @OneToMany(targetEntity = UsedPackageEntity.class, mappedBy = "packageEntity")
    private Set<UsedPackageEntity> listUsedPackage;//for usedPackage
}
