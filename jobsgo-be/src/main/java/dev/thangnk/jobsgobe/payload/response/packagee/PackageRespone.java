package dev.thangnk.jobsgobe.payload.response.packagee;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
@Getter
@Setter
@Builder
public class PackageRespone {
    private Long id;
    private Date date_create;
    private Date date_update;
    private String description;
    private Double discount;
    private Integer duration;
    private Integer typePackage;
    private String image;
    private String name;
    private Double price;
}
