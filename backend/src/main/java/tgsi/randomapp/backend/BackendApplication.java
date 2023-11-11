package tgsi.randomapp.backend;

import tgsi.randomapp.backend.auth.AuthenticationService;
import tgsi.randomapp.backend.auth.RegisterRequest;
import tgsi.randomapp.backend.user.Role;
import tgsi.randomapp.backend.user.UserMapper;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static tgsi.randomapp.backend.user.Role.ADMIN;
import static tgsi.randomapp.backend.user.Role.MANAGER;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service,
			UserMapper userMapper) {

		return args -> {
			if (userMapper.findByEmail("admin@mail.com") == null) {
				var admin = RegisterRequest.builder()
						.firstname("Admin")
						.lastname("Admin")
						.email("admin@mail.com")
						.password("password")
						.role(ADMIN)
						.build();
				System.out.println("Admin token: " + service.register(admin).getAccessToken());
			}

			if (userMapper.findByEmail("manager@mail.com") == null) {
				var manager = RegisterRequest.builder()
						.firstname("Manager")
						.lastname("Manager")
						.email("manager@mail.com")
						.password("password")
						.role(MANAGER)
						.build();
				System.out.println("Manager token: " + service.register(manager).getAccessToken());
			}

		};
	}
}
