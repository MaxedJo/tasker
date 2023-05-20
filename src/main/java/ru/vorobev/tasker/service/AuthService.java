package ru.vorobev.tasker.service;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
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
                .id(user.getId())
                .role(user.getRole())
                .token(token)
                .build();
    }

    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new DuplicateKeyException("Пользователь с таким именем уже существует");
        }
        User user = User.builder()
                .fio(request.getFio())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        user = userRepository.findByUsername(user.getUsername()).orElseThrow();

        String token = jwtService.generate(user);
        return AuthenticationResponse.builder()
                .id(user.getId())
                .role(user.getRole())
                .token(token)
                .build();
    }
}
