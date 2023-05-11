package ru.vorobev.tasker.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vorobev.tasker.model.Project;
import ru.vorobev.tasker.repository.ProjectRepository;

import java.util.List;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProject(Long id) {
        Example<Project> example = Example.of(Project.builder().id(id).build());
        return projectRepository.findAll(example).get(0);
    }
}
