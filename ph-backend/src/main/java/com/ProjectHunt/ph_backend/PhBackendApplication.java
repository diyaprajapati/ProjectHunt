package com.ProjectHunt.ph_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class PhBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PhBackendApplication.class, args);
	}

}
