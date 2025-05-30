package com.patamansa.backend.security;

import com.patamansa.backend.model.User;
import com.patamansa.backend.model.Role;
import com.patamansa.backend.repository.UserRepository;
import com.patamansa.backend.dto.LoginRequest;
import com.patamansa.backend.dto.LoginResponse;
import com.patamansa.backend.dto.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public LoginResponse register(RegisterRequest request) {
        User user = new User();
        user.setEmail(request.getUserEmail());
        user.setSenha(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.valueOf(request.getRole().toUpperCase())); // ADMIN ou ADOTANTE

        userRepository.save(user);

        String jwt = jwtService.gerarToken(user.getEmail());
        return new LoginResponse(jwt);
    }

    public LoginResponse login(LoginRequest request) {
        var auth = new UsernamePasswordAuthenticationToken(
                request.getUserEmail(),
                request.getPassword()
        );
        authenticationManager.authenticate(auth);

        String jwt = jwtService.gerarToken(request.getUserEmail());
        return new LoginResponse(jwt);
    }
}

