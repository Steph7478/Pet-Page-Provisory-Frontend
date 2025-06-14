package com.patamansa.backend.security;

import com.patamansa.backend.security.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

        String userEmail = oauth2User.getAttribute("email");

        String jwtToken = jwtService.gerarToken(userEmail);

        String frontendUrl = "https://pata-mansa-site-de-adocao.vercel.app";
        String redirectUrl = frontendUrl + "/login-success?token=" + jwtToken;

        response.sendRedirect(redirectUrl);

    }
}