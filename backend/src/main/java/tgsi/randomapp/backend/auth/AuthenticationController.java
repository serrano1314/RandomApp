package tgsi.randomapp.backend.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(
      @RequestBody RegisterRequest request) {
    System.out.println("AuthenticationController.register");
    return ResponseEntity.ok(service.register(request));
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request, HttpServletResponse httpServletResponse) {
    System.out.println("AuthenticationController.authenticate");
    if (request.getEmail().isEmpty() ||
        request.getPassword().isEmpty()) {
      return ResponseEntity.badRequest().build();
    }

    var response = service.authenticate(request, httpServletResponse);
    if (response == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    // return only a response with body if authenticated
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response) throws IOException {
    System.out.println("AuthenticationController.refreshToken");
    service.refreshToken(request, response);
  }

}
