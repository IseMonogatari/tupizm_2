package com.example.Preproject;

import com.example.Preproject.model.Role;
import com.example.Preproject.repository.RolesRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;


@SpringBootApplication
public class Application {
	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
		RolesRepository roleRepository = context.getBean(RolesRepository.class);

		roleRepository.save(new Role("ROLE_USER"));
		roleRepository.save(new Role("ROLE_ADMIN"));

//		SpringApplication.run(Application.class, args);
	}

}
