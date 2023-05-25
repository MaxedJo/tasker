package ru.vorobev.tasker.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vorobev.tasker.model.Task;
import ru.vorobev.tasker.service.TaskService;

import java.security.Principal;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
@CrossOrigin
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.saveTask(task));
    }

    @GetMapping("/get")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTask(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTask(id));
    }

    @PostMapping("/edit")
    public ResponseEntity<?> updateTask(@RequestBody Task task, Principal principal) {
        return ResponseEntity.ok(taskService.updateTask(task, principal.getName()));
    }

    @GetMapping("/{id}/delete")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, Principal principal) {
        taskService.deleteTask(id, principal.getName());
        return ResponseEntity.status(HttpStatus.OK).body("Задача успешно удалена");
    }

}
