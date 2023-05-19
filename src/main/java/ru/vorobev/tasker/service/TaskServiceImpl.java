package ru.vorobev.tasker.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import ru.vorobev.tasker.mapper.TaskMapper;
import ru.vorobev.tasker.model.*;
import ru.vorobev.tasker.repository.ChangeRepository;
import ru.vorobev.tasker.repository.ProjectRepository;
import ru.vorobev.tasker.repository.TaskRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final ProjectRepository projectRepository;
    private final UserService userService;
    private final ChangeRepository changeRepository;


    @Override
    public Task saveTask(Task task) {
        Change change = Change.builder()
                .author(task.getOwner())
                .task(task.getId())
                .field(Field.NONE)
                .changeTime(LocalDateTime.now())
                .build();
        changeRepository.save(change);
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTask(Long id) {
        return taskRepository.getTasksByIdIs(id);
    }

    @Override
    public Task updateTask(Task task, String username) {
        User user = userService.getUser(username);
        var old = taskRepository.getTasksByIdIs(task.getId());
        if (ObjectUtils.isNotEmpty(old)) {
            Project project = projectRepository.findProjectByIdIs(old.getProject());
            if (!Role.ADMIN.equals(user.getRole())) {
                if (!project.getMembers().contains(user))
                    return null;
            }
            if (!old.equals(task)) {
                Change change = Change.builder()
                        .author(user.getId())
                        .changeTime(LocalDateTime.now())
                        .build();
                if (task.getUser() != old.getUser()) {
                    changeRepository.save(change.withField(Field.USER)
                            .withNewValue(String.valueOf(task.getUser()))
                            .withOldValue(String.valueOf(old.getUser())));
                }
            }
            taskMapper.updateTaskFromDto(task, old);
            return taskRepository.save(old);
        }
        return null;
    }

    @Override
    public void deleteTask(Long id, String username) {
        Task task = taskRepository.getTasksByIdIs(id);
        User user = userService.getUser(username);

        if (ObjectUtils.isNotEmpty(task)) {
            if (!Role.ADMIN.equals(user.getRole())) {
                if (!task.getOwner().equals(user.getId()))
                    return;
            }
            taskRepository.delete(task);
        }
    }
}
