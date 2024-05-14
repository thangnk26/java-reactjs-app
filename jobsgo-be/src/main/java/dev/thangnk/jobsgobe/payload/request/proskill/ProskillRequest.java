package dev.thangnk.jobsgobe.payload.request.proskill;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProskillRequest {
    private String name;
    private Long careerId;
}
