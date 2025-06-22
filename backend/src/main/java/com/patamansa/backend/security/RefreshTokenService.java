package com.patamansa.backend.security;

import com.patamansa.backend.model.RefreshToken;
import com.patamansa.backend.model.User;
import com.patamansa.backend.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository repo;

    public RefreshToken create(User user) {
        RefreshToken rt = new RefreshToken();
        rt.setUser(user);
        rt.setToken(UUID.randomUUID().toString());
        rt.setExpiry(Instant.now().plus(7, ChronoUnit.DAYS));
        return repo.save(rt);
    }

    public User validate(String token) {
        RefreshToken rt = repo.findByTokenAndRevokedAtIsNull(token)
                .orElseThrow(() -> new IllegalArgumentException("Refresh inválido"));

        if (rt.getExpiry().isBefore(Instant.now()))
            throw new IllegalArgumentException("Refresh expirado");

        return rt.getUser();
    }

    public void revoke(String token) {
        repo.findByTokenAndRevokedAtIsNull(token).ifPresent(rt -> {
            rt.setRevokedAt(Instant.now());
            repo.save(rt);
        });
    }
}
