package com.tgsi.randomapp.services;

import com.tgsi.randomapp.dto.JwtAuthenticationResponse;
import com.tgsi.randomapp.dto.RefreshTokenRequest;
import com.tgsi.randomapp.dto.SignInRequest;
import com.tgsi.randomapp.dto.SignUpRequest;
import com.tgsi.randomapp.entities.User;

public interface AuthenticationService {

    User signup(SignUpRequest signUpRequest);

    JwtAuthenticationResponse signin(SignInRequest signInRequest);

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
