package ru.vorobev.tasker.service;


import ru.vorobev.tasker.model.Task;

import java.util.List;

public interface TaskService {

    Task saveTask(Task task);

    List<Task> getAllTasks();

    Task getTask(Long id);

}
