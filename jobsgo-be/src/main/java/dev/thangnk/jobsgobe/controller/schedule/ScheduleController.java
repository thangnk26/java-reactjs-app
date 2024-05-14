package dev.thangnk.jobsgobe.controller.schedule;

import dev.thangnk.jobsgobe.service.impl.schedule.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;
    public void cronJob(){
        scheduleService.cronJob();
    }
}
