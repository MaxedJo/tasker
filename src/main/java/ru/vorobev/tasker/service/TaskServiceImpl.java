package ru.vorobev.tasker.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.vorobev.tasker.model.Task;
import ru.vorobev.tasker.repository.TaskRepository;
import ru.vorobev.tasker.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;
    private UserRepository userRepository;

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
}
