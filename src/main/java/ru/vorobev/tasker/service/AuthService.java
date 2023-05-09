package ru.vorobev.tasker.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.vorobev.tasker.controller.dto.AuthRequest;
import ru.vorobev.tasker.controller.dto.AuthenticationResponse;
import ru.vorobev.tasker.controller.dto.RegisterRequest;
import ru.vorobev.tasker.model.Role;
import ru.vorobev.tasker.model.User;
import ru.vorobev.tasker.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse auth(AuthRequest request) {
        authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword())
        );
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.generate(user);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    public AuthenticationResponse register(RegisterRequest request) {
        User user = User.builder()
                .fio(request.getFio())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        String token = jwtService.generate(user);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }
}
