package ru.vorobev.tasker.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vorobev.tasker.mapper.ProjectMapper;
import ru.vorobev.tasker.model.Project;
import ru.vorobev.tasker.model.Role;
import ru.vorobev.tasker.model.User;
import ru.vorobev.tasker.repository.ProjectRepository;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMapper mapper;
    private final UserService userService;

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProject(Long id) {
        Example<Project> example = Example.of(Project.builder().id(id).build());
        return projectRepository.findAll(example).get(0);
    }

    @Override
    public Project updateProject(Project project, String username) {
        User user = userService.getUser(username);
        var old = projectRepository.findProjectByIdIs(project.getId());
        System.out.println(old);
        if (ObjectUtils.isNotEmpty(old)) {
            if (!Objects.equals(user.getId(), old.getOwner().getId()) && !Role.ADMIN.equals(user.getRole()))
                return null;
            mapper.updateProjectFromDto(project, old);
            return projectRepository.save(old);
        }
        project.setOwner(user);
        return projectRepository.save(project);
    }
}
