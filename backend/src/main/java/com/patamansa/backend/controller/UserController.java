package com.patamansa.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/user")
    public ResponseEntity<?> me(Principal principal) {

        if (principal == null) {
            return ResponseEntity
                    .status(401)
                    .body(Map.of("error", "Nenhum usuário logado"));
        }

        if (principal instanceof OAuth2User oauth) {
            return ResponseEntity.ok(oauth.getAttributes());
        }

        if (principal instanceof Authentication auth &&
                auth.getPrincipal() instanceof UserDetails usr) {

            return ResponseEntity.ok(Map.of("username", usr.getUsername()));
        }

        return ResponseEntity.ok(Map.of());
    }
}

