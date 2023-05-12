package ru.vorobev.tasker.service;

import ru.vorobev.tasker.model.Project;
import ru.vorobev.tasker.model.User;

import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects();

    Project getProject(Long id);

    Project updateProject(Project project, String user);

    Project updateProject(User member, String ownerName, Long projectId);
}
