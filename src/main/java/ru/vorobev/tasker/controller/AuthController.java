package ru.vorobev.tasker.controller;

import lombok.AllArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.vorobev.tasker.controller.dto.AuthRequest;
import ru.vorobev.tasker.controller.dto.RegisterRequest;
import ru.vorobev.tasker.service.AuthService;

import java.util.NoSuchElementException;

@Controller
@RequestMapping("/auth")
@CrossOrigin
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {
        try {
            return ResponseEntity.ok(authService.register(request));
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/auth")
    public ResponseEntity<?> auth(
            @RequestBody AuthRequest request
    ) {
        try {
            return ResponseEntity.ok(authService.auth(request));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
