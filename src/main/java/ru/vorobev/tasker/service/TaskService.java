package ru.vorobev.tasker.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import ru.vorobev.tasker.controller.dto.StatusValues;
import ru.vorobev.tasker.mapper.TaskMapper;
import ru.vorobev.tasker.model.*;
import ru.vorobev.tasker.repository.ChangeRepository;
import ru.vorobev.tasker.repository.TaskRepository;
import ru.vorobev.tasker.repository.UserRepository;
import ru.vorobev.tasker.util.UserValidator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final UserService userService;
    private final UserRepository userRepository;
    private final ChangeRepository changeRepository;
    private final UserValidator userValidator;


    public Task saveTask(Task task) {
        task.setStatus(Status.OPENED);
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

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTask(Long id) {
        return taskRepository.getTasksByIdIs(id);
    }

    public Task updateTask(Task task, String username) {
        if (Objects.equals(task.getUser(), 0L)) {
            task.setUser(null);
        }
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
                if (!Objects.equals(task.getUser(), old.getUser())) {
                    User userOld = userRepository.findUserByIdIs(old.getUser());
                    if (userOld == null) {
                        userOld = new User();
                        userOld.setFio("Не назначен");
                    }
                    User userNew = userRepository.findUserByIdIs(task.getUser());
                    changeRepository.save(change.withField(Field.USER)
                            .withNewValue(String.valueOf(userNew.getFio()))
                            .withOldValue(String.valueOf(userOld.getFio())));
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
                if (!Objects.equals(task.getDeadline(), old.getDeadline())) {
                    changeRepository.save(change.withField(Field.DEADLINE)
                            .withNewValue(String.valueOf(task.getDeadline()))
                            .withOldValue(String.valueOf(old.getDeadline())));
                }
                if (!Objects.equals(task.getDescription(), old.getDescription())) {
                    changeRepository.save(change.withField(Field.DESCRIPTION));
                }
            }
            taskMapper.updateTaskFromDto(task, old);
            if (old.getStatus() == Status.ARCHIVED) {
                old.setUser(null);
            }
            return taskRepository.save(old);
        }
        return null;
    }

    public void deleteTask(Long id, String username) {
        Task task = taskRepository.getTasksByIdIs(id);

        if (ObjectUtils.isNotEmpty(task)) {
            if (!userValidator.ownerByTaskId(id, username)) {
                return;
            }
            taskRepository.delete(task);
        }
    }

    public List<StatusValues> getStatuses(Long taskId, String username) {
        List<StatusValues> statuses = new ArrayList<>();
        statuses.add(new StatusValues(Status.OPENED.name(), "Открыта"));
        statuses.add(new StatusValues(Status.WORKING.name(), "В работе"));
        statuses.add(new StatusValues(Status.TESTING.name(), "На тестировании"));
        statuses.add(new StatusValues(Status.CLOSED.name(), "Завершена"));
        if (userValidator.projectOwnerByTaskId(taskId, username))
            statuses.add(new StatusValues(Status.ARCHIVED.name(), "В архиве"));
        return statuses;
    }
}
