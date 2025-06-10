package com.patamansa.backend.controller;

import com.patamansa.backend.dto.LoginRequest;
import com.patamansa.backend.dto.LoginResponse;
import com.patamansa.backend.dto.RegisterRequest;
import com.patamansa.backend.security.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public LoginResponse register(@RequestBody RegisterRequest request) {
        return authenticationService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        LoginResponse token = authenticationService.login(request);

        // Pra criar o cookie
        String cookie = String.format(
                "token=%s; Path=/; HttpOnly; Secure; SameSite=None",
                token.getToken()
        );
        // Adiciona o cookie na resposta
        response.addHeader("Set-Cookie", cookie);

        return ResponseEntity.ok("Login realizado com sucesso");
    }


    @GetMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        response.setHeader("Set-Cookie",
                "jwt=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=None");

        return ResponseEntity.noContent().build();
    }
}
