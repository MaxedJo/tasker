package ru.vorobev.tasker.service;

import ru.vorobev.tasker.model.Project;
import ru.vorobev.tasker.model.User;

import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects(String user);

    void leaveProject(Long id, String username);

    Project getProject(Long id);

    Project updateProject(Project project, String user);

    Project deleteUserFromProject(Long id, String user, Long userId);

    void deleteProject(Long id, String username);


    Project updateProject(User member, String ownerName, Long projectId);
}
