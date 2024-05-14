package dev.thangnk.jobsgobe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class JobsgoBeApplication {
	public static void main(String[] args) {
		SpringApplication.run(JobsgoBeApplication.class, args);
	}

}
