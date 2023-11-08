package com.tgsi.randomapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.tgsi.randomapp.entities.Role;
import com.tgsi.randomapp.entities.User;
import com.tgsi.randomapp.mapper.UserMapper;

@SpringBootApplication
public class RandomappApplication implements CommandLineRunner {

	@Autowired
	private UserMapper userMapper;

	public static void main(String[] args) {
		SpringApplication.run(RandomappApplication.class, args);
	}

	public void run(String... args) {
		User adminAccount = userMapper.findByRole(Role.ADMIN.name());

		if (null == adminAccount) {
			User user = new User();

			user.setEmail("admin@gmail.com");
			user.setFirstname("admin");
			user.setLastname("admin");
			user.setRole(Role.ADMIN.name());
			user.setPassword(new BCryptPasswordEncoder().encode("admin"));
			userMapper.insertUser(user);
		}

		// System.out.println("qwertyui".substring(-1, 3));
	}
}
