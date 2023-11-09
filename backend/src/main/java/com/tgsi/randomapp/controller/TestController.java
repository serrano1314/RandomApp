package com.tgsi.randomapp.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tgsi.randomapp.dto.SignUpRequest;
import com.tgsi.randomapp.entities.Role;
import com.tgsi.randomapp.entities.User;
import com.tgsi.randomapp.mapper.UserMapper;

@RestController
@RequestMapping("api/v1/users")
public class TestController {

    // final String BASE_URL = "http://localhost:5173";

    @Autowired
    private UserMapper userMapper;

    @GetMapping("/hi")
    public void sayHi() {
        System.out.println("HI");
        sayHi();
    }

    @GetMapping("/all")
    public List<User> getAllUser() {

        return userMapper.getAllUser();
        // List<User> users = userMapper.getAllUser();

        // List<User> updatedUsers = users.stream()
        // .map(user -> {
        // // Add string representations of created_on and updated_on fields to the User
        // user.setCreatedOnString(user.getCreated_on().toString());
        // user.setUpdatedOnString(user.getUpdated_on().toString());
        // return user;
        // })
        // .collect(Collectors.toList());

        // return updatedUsers;
    }

    @GetMapping("/get/{id}")
    public List<User> getUserById(@PathVariable("id") Long id) {
        return userMapper.getUserById(id);
    }

    // @CrossOrigin(origins = BASE_URL, allowCredentials = "true")
    @PostMapping("/register")
    public ResponseEntity<User> addUserMethod(@RequestBody SignUpRequest signUpRequest) {
        User user = new User();
        user.setFirstname(signUpRequest.getFirstname());
        user.setLastname(signUpRequest.getLastname());
        user.setEmail(signUpRequest.getEmail());
        user.setRole(Role.USER.name());
        user.setPassword(new BCryptPasswordEncoder().encode(signUpRequest.getPassword()));

        // Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        // user.setCreated_on(currentTimestamp);
        // user.setUpdated_on(currentTimestamp);

        userMapper.insertUser(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update/{id}")
    public void getAndUpdate(@PathVariable("id") Long id) {
        User updatingUser = new User();
        System.out.println("UPDATEEE>>> " +
                userMapper.getUserById(id).get(0).getId() + ", " +
                userMapper.getUserById(id).get(0).getFirstname() + ", " +
                userMapper.getUserById(id).get(0).getLastname() + ", " +
                userMapper.getUserById(id).get(0).getEmail() + ", " +
                userMapper.getUserById(id).get(0).getPassword() + ", " +
                userMapper.getUserById(id).get(0).getRole() + ", ");

        // String currentFirstname = userMapper.getUserById(id).get(0).getFirstname();
        String currentLastname = userMapper.getUserById(id).get(0).getLastname();
        String currentEmail = userMapper.getUserById(id).get(0).getEmail();
        String currentPassword = userMapper.getUserById(id).get(0).getPassword();
        // int currentId = userMapper.getUserById(id).get(0).getRole();

        updatingUser.setId(id);
        updatingUser.setFirstname("steven");
        updatingUser.setLastname(currentLastname);
        updatingUser.setEmail(currentEmail);
        updatingUser.setPassword(currentPassword);

        userMapper.updateUser(updatingUser);

    }
}
