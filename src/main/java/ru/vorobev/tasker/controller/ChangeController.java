package ru.vorobev.tasker.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.vorobev.tasker.model.Change;
import ru.vorobev.tasker.service.ChangeService;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/changes")
public class ChangeController {

    private final ChangeService changeService;

    @GetMapping("/{taskId}")
    public List<Change> getChangesByTaskId(@PathVariable Long taskId, Principal principal) {
        return changeService.getChangesByTaskId(taskId, principal.getName());
    }
}
