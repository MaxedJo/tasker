package ru.vorobev.tasker.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vorobev.tasker.model.Project;
import ru.vorobev.tasker.model.User;
import ru.vorobev.tasker.service.ProjectService;

import java.security.Principal;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/project")
public class ProjectController {
    private final ProjectService service;

    @GetMapping("/all")
    public ResponseEntity<?> getAll(Principal principal) {
        return ResponseEntity.ok(service.getAllProjects(principal.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProject(@PathVariable Long id, Principal principal) {
        try {
            return ResponseEntity.ok(service.getProject(id, principal.getName()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<?> editUser(Principal principal, @RequestBody Project project) {
        return ResponseEntity.ok(service.updateProject(project, principal.getName()));
    }

    @PostMapping("/{id}/add-user")
    public ResponseEntity<?> addUserToProject(Principal principal, @PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(service.updateProject(user, principal.getName(), id));
    }

    @GetMapping("/task/{id}")
    public ResponseEntity<?> getProjectsForTask(@PathVariable Long id) {
        return ResponseEntity.ok(service.getProjectsForTask(id));
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<?> getMembers(Principal principal, @PathVariable Long id) {
        return ResponseEntity.ok(service.getProject(id, principal.getName()).getMembers());
    }

    @GetMapping("/{id}/delete")
    public ResponseEntity<?> deleteProject(@PathVariable Long id, Principal principal) {
        service.deleteProject(id, principal.getName());
        return ResponseEntity.status(HttpStatus.OK).body("Проект успешно удалён");
    }

    @GetMapping("/{id}/leave")
    public ResponseEntity<?> leaveProject(@PathVariable Long id, Principal principal) {
        service.leaveProject(id, principal.getName());
        return ResponseEntity.status(HttpStatus.OK).body("Проект успешно покинут");
    }

    @GetMapping("/{id}/delete-user/{userId}")
    public ResponseEntity<?> deleteUserFromProject(@PathVariable Long id, Principal principal, @PathVariable Long userId) {
        return ResponseEntity.ok(service.deleteUserFromProject(id, principal.getName(), userId));
    }
}
