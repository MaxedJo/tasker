package ru.vorobev.tasker.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.vorobev.tasker.controller.dto.StatusValues;
import ru.vorobev.tasker.model.Status;
import ru.vorobev.tasker.model.Task;
import ru.vorobev.tasker.service.TaskService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
@CrossOrigin
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/add")
    public Task add(@RequestBody Task task) {
        task.setStatus(Status.OPENED);
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

    @PostMapping("/edit")
    public Task updateTask(@RequestBody Task task, Principal principal) {
        return taskService.updateTask(task, principal.getName());
    }

    @GetMapping("/{id}/delete")
    public void deleteTask(@PathVariable Long id, Principal principal) {
        taskService.deleteTask(id, principal.getName());
    }

    @GetMapping("/{id}/statuses")
    public List<StatusValues> getStatuses(@PathVariable Long id, Principal principal) {
        return taskService.getStatuses(id, principal.getName());
    }

}
