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
import ru.vorobev.tasker.repository.UserRepository;

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
    private final UserRepository userRepository;

    @Override
    public List<Project> getAllProjects(String username) {
        User user = userService.getUser(username);
        if (user.getRole().equals(Role.ADMIN))
            return projectRepository.findAll();
        return projectRepository.findProjectByMembers_Id(user.getId());
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
        project.setMembers(List.of(user));
        return projectRepository.save(project);
    }

    @Override
    public Project deleteUserFromProject(Long id, String username, Long userId) {
        User user = userService.getUser(username);
        User userToDelete = userRepository.findUserByIdIs(userId);
        var old = projectRepository.findProjectByIdIs(id);
        if (ObjectUtils.isNotEmpty(old)) {
            if (!Objects.equals(user.getId(), old.getOwner().getId()) && !Role.ADMIN.equals(user.getRole()))
                return null;
            old.getMembers().remove(userToDelete);
            return projectRepository.save(old);
        }
        return null;
    }

    @Override
    public Project updateProject(User member, String ownerName, Long projectId) {
        User user = userService.getUser(ownerName);
        var old = projectRepository.findProjectByIdIs(projectId);
        if (ObjectUtils.isNotEmpty(old)) {
            if (!Objects.equals(user.getId(), old.getOwner().getId()) && !Role.ADMIN.equals(user.getRole()))
                return null;
            old.getMembers().add(member);
            return projectRepository.save(old);
        }
        return null;
    }

    @Override
    public void deleteProject(Long id, String username) {
        Project project = projectRepository.findProjectByIdIs(id);
        User user = userService.getUser(username);

        if (ObjectUtils.isNotEmpty(project)) {
            if (!Role.ADMIN.equals(user.getRole())) {
                if (!project.getOwner().equals(user))
                    return;
            }
            projectRepository.delete(project);
        }
    }

    @Override
    public void leaveProject(Long id, String username) {
        Project project = projectRepository.findProjectByIdIs(id);
        User user = userService.getUser(username);

        if (ObjectUtils.isNotEmpty(project)) {
            if (!Role.ADMIN.equals(user.getRole())) {
                if (!project.getMembers().contains(user))
                    return;
            }
            project.getMembers().remove(user);
            projectRepository.save(project);
        }
    }
}
