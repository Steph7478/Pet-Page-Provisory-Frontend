package com.patamansa.backend.controller;

import com.patamansa.backend.dto.LoginRequest;
import com.patamansa.backend.dto.LoginResponse;
import com.patamansa.backend.dto.MeResponse;
import com.patamansa.backend.dto.RegisterRequest;
import com.patamansa.backend.model.User;
import com.patamansa.backend.security.AuthenticationService;
import com.patamansa.backend.security.CookieUtil;
import com.patamansa.backend.security.JwtService;
import com.patamansa.backend.security.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    private final RefreshTokenService refreshTokenService;

    private final JwtService jwtService;

    private final CookieUtil cookieUtil;

    @PostMapping("/register")
    public LoginResponse register(@RequestBody RegisterRequest request) {
        return authenticationService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req,
                               HttpServletResponse res) {
        // o AuthenticationService gera access-token, cria refresh-token
        // e grava os dois cookies na resposta
        return authenticationService.login(req, res);
    }

    @PostMapping("/refresh")
    public LoginResponse refresh(@CookieValue("refreshToken") String rt,
                                 HttpServletResponse res) {

        User user = refreshTokenService.validate(rt);   // lança se inválido
        String newAccess = jwtService.gerarToken(user.getEmail());

        refreshTokenService.revoke(rt);
        String newRt = refreshTokenService.create(user).getToken();

        cookieUtil.addAuthCookie(res, newAccess);
        cookieUtil.addRefreshCookie(res, newRt);

        return new LoginResponse(newAccess);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@CookieValue("refreshToken") String rt,
                                       HttpServletResponse res) {
        refreshTokenService.revoke(rt);
        cookieUtil.expireAuthCookie(res);
        cookieUtil.expireRefreshCookie(res);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {

        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", "Usuário não autenticado"));
        }

        // login próprio (JWT)
        if (auth.getPrincipal() instanceof UserDetails usr) {
            return ResponseEntity.ok(
                    new MeResponse(
                            usr.getUsername(),
                            usr.getAuthorities()
                                    .stream()
                                    .map(a -> a.getAuthority())
                                    .toArray(String[]::new),
                            "local")                // ou "jwt"
            );
        }

        // login Google (OAuth2User)
        if (auth.getPrincipal() instanceof OAuth2User oauth) {
            return ResponseEntity.ok(
                    new MeResponse(
                            oauth.getAttribute("email"),
                            new String[]{"USER"},
                            "google")
            );
        }

        return ResponseEntity.status(500)
                .body(Map.of("error", "Tipo de autenticação desconhecido"));
    }
}
