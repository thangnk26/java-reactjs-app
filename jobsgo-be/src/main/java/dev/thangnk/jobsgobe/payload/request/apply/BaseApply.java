package dev.thangnk.jobsgobe.payload.request.apply;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BaseApply {
    private Long jobId;
    private Long resumeId;
}
