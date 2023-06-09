package ru.vorobev.tasker.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.vorobev.tasker.model.Role;
import ru.vorobev.tasker.model.User;
import ru.vorobev.tasker.repository.UserRepository;
import ru.vorobev.tasker.service.UserService;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/user-api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

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

    @GetMapping("/user")
    public ResponseEntity<?> currentUser(Principal principal) {
        return ResponseEntity.ok(userService.getUser(principal.getName()));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userRepository.findUserByIdIs(id));
    }

    @PostMapping("/user/edit")
    public ResponseEntity<?> editUser(Principal principal, @RequestBody User user) {
        User user1 = userRepository.findByUsername(principal.getName()).get();
        if (!principal.getName().equals(user.getUsername()) && user1.getRole().equals(Role.USER)) {
            return ResponseEntity.status(HttpStatus.LOCKED).body("Недостаточно прав");
        }
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @GetMapping("/created-tasks")
    public ResponseEntity<?> getCreated(Principal principal) {
        return ResponseEntity.ok(userRepository.findByUsername(principal.getName()).get().getCreated());
    }

    @GetMapping("/assigned-tasks")
    public ResponseEntity<?> getAssigned(Principal principal) {
        return ResponseEntity.ok(userRepository.findByUsername(principal.getName()).get().getAssigned());
    }
}
