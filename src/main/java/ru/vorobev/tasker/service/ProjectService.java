package ru.vorobev.tasker.service;

import ru.vorobev.tasker.model.Project;

import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects();
    Project getProject(Long id);

}
