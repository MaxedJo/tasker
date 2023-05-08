package ru.vorobev.tasker.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.vorobev.tasker.model.User;
import ru.vorobev.tasker.service.UserService;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/user-api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/user/all")
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok(userService.getUsers());
    }

    @PostMapping("/user/create")
    public ResponseEntity<User> createUser(@RequestBody User user){
        URI uri = URI.create(ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/api/user/create").toUriString());
        return ResponseEntity.created(uri).body(userService.createUser(user));
    }

}
