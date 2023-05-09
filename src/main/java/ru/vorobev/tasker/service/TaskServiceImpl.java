package ru.vorobev.tasker.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.vorobev.tasker.model.Task;
import ru.vorobev.tasker.repository.TaskRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;

    @Override
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}
