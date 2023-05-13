package ru.vorobev.tasker.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.vorobev.tasker.model.Project;
import ru.vorobev.tasker.model.User;
import ru.vorobev.tasker.service.ProjectService;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/project")
public class ProjectController {
    private final ProjectService service;

    @GetMapping("/all")
    public List<Project> getAll() {
        return service.getAllProjects();
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable Long id) {

        System.out.println(id);
        return service.getProject(id);
    }

    @PostMapping("/edit")
    public Project editUser(Principal principal, @RequestBody Project project) {
        return service.updateProject(project, principal.getName());
    }

    @PostMapping("/{id}/add-user")
    public Project addUserToProject(Principal principal, @PathVariable Long id, @RequestBody User user) {
        return service.updateProject(user, principal.getName(), id);
    }

    @GetMapping("/{id}/members")
    public List<User> getMembers(Principal principal, @PathVariable Long id) {
        return service.getProject(id).getMembers();
    }

    @GetMapping("/{id}/delete")
    public void deleteProject(@PathVariable Long id, Principal principal) {
        service.deleteProject(id, principal.getName());
    }

    @GetMapping("/{id}/delete-user/{userId}")
    public Project deleteUserFromProject(@PathVariable Long id, Principal principal, @PathVariable Long userId) {
        System.out.println("WORKING");
        return service.deleteUserFromProject(id, principal.getName(), userId);
    }
}
