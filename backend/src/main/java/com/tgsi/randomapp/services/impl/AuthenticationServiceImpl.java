package com.tgsi.randomapp.services.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tgsi.randomapp.dto.JwtAuthenticationResponse;
import com.tgsi.randomapp.dto.RefreshTokenRequest;
import com.tgsi.randomapp.dto.SignInRequest;
import com.tgsi.randomapp.dto.SignUpRequest;
import com.tgsi.randomapp.entities.Role;
import com.tgsi.randomapp.entities.User;
import com.tgsi.randomapp.mapper.UserMapper;
import com.tgsi.randomapp.services.AuthenticationService;
import com.tgsi.randomapp.services.JWTService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    private final UserMapper userMapper;

    @Override
    public User signup(SignUpRequest signUpRequest) {
        User user = new User();

        user.setEmail(signUpRequest.getEmail());
        user.setFirstname(signUpRequest.getFirstname());
        user.setLastname(signUpRequest.getLastname());
        user.setRole(Role.USER.name());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        userMapper.insertUser(user);
        return user;
    }

    public JwtAuthenticationResponse signin(SignInRequest signInRequest) {

        System.out.println("AUTH<<<<<<");
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signInRequest.getEmail(),
                signInRequest.getPassword()));

        System.out.println("AUTH>>>>>>");

        User user = userMapper.findByEmail(signInRequest.getEmail());

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        System.out.println("TOKEN>>>");
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        return jwtAuthenticationResponse;

    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {

        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
        User user = userMapper.findByEmail(userEmail);

        if (jwtService.isTokenValid(refreshTokenRequest.getToken(), user)) {
            var jwt = jwtService.generateToken(user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
            return jwtAuthenticationResponse;
        }
        return null;

    }

}
