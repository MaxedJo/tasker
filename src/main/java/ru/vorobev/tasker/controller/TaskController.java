package ru.vorobev.tasker.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.vorobev.tasker.model.Task;
import ru.vorobev.tasker.service.TaskService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/add")
    public String add(@RequestBody Task task) {
        taskService.saveTask(task);
        return "New Task Added";
    }

    @GetMapping("/get")
    public List<Task> getAll() {
        return taskService.getAllTasks();
    }
}
