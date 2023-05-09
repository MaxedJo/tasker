package ru.vorobev.tasker.controller;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.vorobev.tasker.model.Task;
import ru.vorobev.tasker.service.TaskService;

import java.util.List;

@RestController
@RequestMapping("/task")
@AllArgsConstructor
@CrossOrigin
public class TaskController {

    private TaskService taskService;

    @PostMapping("/add")
    public String add(@RequestBody Task task) {
        System.out.println(task);

        taskService.saveTask(task);
        return "New Task Added";
    }

    @GetMapping("/get")
    public List<Task> getAll() {
        return taskService.getAllTasks();
    }
}
