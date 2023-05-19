package ru.vorobev.tasker.util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.vorobev.tasker.model.Project;
import ru.vorobev.tasker.model.Role;
import ru.vorobev.tasker.model.Task;
import ru.vorobev.tasker.model.User;
import ru.vorobev.tasker.repository.ProjectRepository;
import ru.vorobev.tasker.repository.TaskRepository;
import ru.vorobev.tasker.service.UserService;


@Component
@RequiredArgsConstructor
public class UserValidator {
    private final ProjectRepository projectRepository;
    private final UserService userService;
    private final TaskRepository taskRepository;

    public boolean projectMemberByTaskId(Long taskId, String username) {
        User user = userService.getUser(username);
        Task task = taskRepository.getTasksByIdIs(taskId);
        Project project = projectRepository.findProjectByIdIs(task.getProject());
        if (!Role.ADMIN.equals(user.getRole())) {
            return project.getMembers().contains(user);
        }
        return true;
    }
}
