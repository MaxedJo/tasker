package ru.vorobev.tasker.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.vorobev.tasker.model.Task;
import ru.vorobev.tasker.service.TaskService;

import java.util.List;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
@CrossOrigin
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/add")
    public Task add(@RequestBody Task task) {

        return taskService.saveTask(task);
    }

    @GetMapping("/get")
    public List<Task> getAll() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTask(@PathVariable Long id) {

        return taskService.getTask(id);
    }

}
