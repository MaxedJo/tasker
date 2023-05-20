package ru.vorobev.tasker.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vorobev.tasker.service.ChangeService;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/changes")
public class ChangeController {

    private final ChangeService changeService;

    @GetMapping("/{taskId}")
    public ResponseEntity<?> getChangesByTaskId(@PathVariable Long taskId, Principal principal) {
        try {
            return ResponseEntity.ok(changeService.getChangesByTaskId(taskId, principal.getName()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
