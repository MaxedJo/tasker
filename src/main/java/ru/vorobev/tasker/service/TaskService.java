package ru.vorobev.tasker.service;


import org.springframework.stereotype.Service;
import ru.vorobev.tasker.model.Task;

import java.util.List;

public interface TaskService {

    public Task saveTask(Task task);

    public List<Task> getAllTasks();
}
