package com.patamansa.backend.security;

import com.patamansa.backend.config.CookieProps;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CookieUtil {

    private final CookieProps cfg;

    // access-token (15 min)
    public void addAuthCookie(HttpServletResponse res, String jwt) {
        String header = "token=%s; Path=/; Domain=%s; HttpOnly; SameSite=None; %s; Max-Age=%d"
                .formatted(jwt, cfg.getDomain(),
                        cfg.isSecure() ? "Secure" : "",
                        900);
        res.addHeader("Set-Cookie", header);
    }

    // refresh-token (7 dias)
    public void addRefreshCookie(HttpServletResponse res, String rt) {
        String header = "refreshToken=%s; Path=/; Domain=%s; HttpOnly; SameSite=None; %s; Max-Age=%d"
                .formatted(rt, cfg.getDomain(),
                        cfg.isSecure() ? "Secure" : "",
                        7 * 24 * 60 * 60);
        res.addHeader("Set-Cookie", header);
    }

    //  expiradores
    public void expireAuthCookie(HttpServletResponse res)  {
        res.addHeader("Set-Cookie", "token=; Path=/; Domain=%s; Max-Age=0; HttpOnly; SameSite=None; %s"
                .formatted(cfg.getDomain(), cfg.isSecure() ? "Secure" : ""));
    }
    public void expireRefreshCookie(HttpServletResponse res) {
        res.addHeader("Set-Cookie", "refreshToken=; Path=/; Domain=%s; Max-Age=0; HttpOnly; SameSite=None; %s"
                .formatted(cfg.getDomain(), cfg.isSecure() ? "Secure" : ""));
    }
}

