package ru.vorobev.tasker.service;

import lombok.AllArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import ru.vorobev.tasker.mapper.TaskMapper;
import ru.vorobev.tasker.model.Project;
import ru.vorobev.tasker.model.Role;
import ru.vorobev.tasker.model.Task;
import ru.vorobev.tasker.model.User;
import ru.vorobev.tasker.repository.ProjectRepository;
import ru.vorobev.tasker.repository.TaskRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;
    private TaskMapper taskMapper;
    private ProjectRepository projectRepository;
    private UserService userService;

    @Override
    public Task saveTask(Task task) {
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
        System.out.println("TASK");
        System.out.println(task);
        User user = userService.getUser(username);
        var old = taskRepository.getTasksByIdIs(task.getId());
        if (ObjectUtils.isNotEmpty(old)) {
            Project project = projectRepository.findProjectByIdIs(old.getProject());
            if (!Role.ADMIN.equals(user.getRole())) {
                if (!project.getMembers().contains(user))
                    return null;
            }
            taskMapper.updateTaskFromDto(task, old);
            return taskRepository.save(old);
        }
        System.out.println("ERROR2");
        return null;
    }
}
