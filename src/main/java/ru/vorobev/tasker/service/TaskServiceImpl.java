package ru.vorobev.tasker.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import ru.vorobev.tasker.mapper.TaskMapper;
import ru.vorobev.tasker.model.*;
import ru.vorobev.tasker.repository.ChangeRepository;
import ru.vorobev.tasker.repository.ProjectRepository;
import ru.vorobev.tasker.repository.TaskRepository;
import ru.vorobev.tasker.util.UserValidator;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final ProjectRepository projectRepository;
    private final UserService userService;
    private final ChangeRepository changeRepository;
    private final UserValidator userValidator;


    @Override
    public Task saveTask(Task task) {
        Task created = taskRepository.save(task);
        Change change = Change.builder()
                .author(created.getOwner())
                .task(created.getId())
                .field(Field.NONE)
                .changeTime(LocalDateTime.now())
                .build();
        changeRepository.save(change);
        return created;
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
            if (!userValidator.projectMemberByTaskId(task.getId(), username)) {
                return null;
            }
            if (!old.equals(task)) {
                Change change = Change.builder()
                        .author(user.getId())
                        .task(old.getId())
                        .changeTime(LocalDateTime.now())
                        .build();
                if (task.getUser() != old.getUser()) {
                    changeRepository.save(change.withField(Field.USER)
                            .withNewValue(String.valueOf(task.getUser()))
                            .withOldValue(String.valueOf(old.getUser())));
                }
                if (task.getStatus() != old.getStatus()) {
                    changeRepository.save(change.withField(Field.STATUS)
                            .withNewValue(String.valueOf(task.getStatus()))
                            .withOldValue(String.valueOf(old.getStatus())));
                }
                if (!Objects.equals(task.getTitle(), old.getTitle())) {
                    changeRepository.save(change.withField(Field.TITLE)
                            .withNewValue(task.getTitle())
                            .withOldValue(old.getTitle()));
                }
                if (!Objects.equals(task.getDescription(), old.getDescription())) {
                    changeRepository.save(change.withField(Field.DESCRIPTION));
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
