package tgsi.randomapp.backend.auth;

import tgsi.randomapp.backend.config.JwtService;
import tgsi.randomapp.backend.token.Token;
import tgsi.randomapp.backend.token.TokenMapper;
import tgsi.randomapp.backend.token.TokenType;
import tgsi.randomapp.backend.user.Role;
import tgsi.randomapp.backend.user.User;
import tgsi.randomapp.backend.user.UserMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  // private final UserRepository repository;
  private final UserMapper userMapper;
  private final TokenMapper tokenMapper;
  // private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthenticationResponse register(RegisterRequest request) {
    System.out.println("AuthenticationService.register");

    var user = User.builder()
        .firstname(request.getFirstname())
        .lastname(request.getLastname())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(request.getRole())
        .build();
    // var savedUser = repository.save(user);
    userMapper.insertUser(user);
    System.out.println(">>>>BUILD<<<<");
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
        .refreshToken(refreshToken)
        .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    System.out.println("AuthenticationService.authenticate");

    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              request.getEmail(),
              request.getPassword()));
    } catch (AuthenticationException e) {
      // Handle authentication failure,

      // throw new Exception("Authentication failed", e);
      // email or password does not exist and will return null for validation
      return null;
    }
    System.out.println("findbyemail ");
    User user = userMapper.findByEmail(request.getEmail());
    // .orElseThrow();
    System.out.println(">>>>>>" + user.toString());
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);

    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
        .refreshToken(refreshToken)
        .role(user.getRole())
        .build();
  }

  private void saveUserToken(User user, String jwtToken) {
    System.out.println("AuthenticationService.saveusertoken");
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .token_type(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .user_id(user.getId())
        .build();
    tokenMapper.insertToken(token);
  }

  public void revokeAllUserTokens(User user) {
    System.out.println("AuthenticationService.revokeallusertoken");
    Integer userId = user.getId();
    List<Token> validUserTokens = tokenMapper.findAllValidTokenByUser(userId);

    if (!validUserTokens.isEmpty()) {
      // Update the tokens to set expired and revoked to true
      tokenMapper.updateTokens(validUserTokens);
    }
  }

  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      User user = this.userMapper.findByEmail(userEmail);
      // .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthenticationResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }
}
