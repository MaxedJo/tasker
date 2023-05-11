package ru.vorobev.tasker.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.vorobev.tasker.model.Project;
import ru.vorobev.tasker.service.ProjectService;

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

}
