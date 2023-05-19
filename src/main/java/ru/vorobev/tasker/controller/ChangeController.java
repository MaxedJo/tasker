package ru.vorobev.tasker.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.vorobev.tasker.model.Change;
import ru.vorobev.tasker.service.ChangeServiceImpl;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/changes")
public class ChangeController {

    private final ChangeServiceImpl changeService;

    @GetMapping("/{taskId}")
    public List<Change> getChangesByTaskId(@PathVariable Long taskId, Principal principal) {
        return changeService.getChangesByTaskId(taskId, principal.getName());
    }
}
