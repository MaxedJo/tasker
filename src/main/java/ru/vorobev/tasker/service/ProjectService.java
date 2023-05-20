package ru.vorobev.tasker.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vorobev.tasker.mapper.ProjectMapper;
import ru.vorobev.tasker.model.*;
import ru.vorobev.tasker.repository.ProjectRepository;
import ru.vorobev.tasker.repository.TaskRepository;
import ru.vorobev.tasker.repository.UserRepository;
import ru.vorobev.tasker.util.UserValidator;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final ProjectMapper mapper;
    private final UserService userService;
    private final UserRepository userRepository;

    private final UserValidator userValidator;

    public List<Project> getAllProjects(String username) {
        User user = userService.getUser(username);
        if (user.getRole().equals(Role.ADMIN))
            return projectRepository.findAll().stream().peek(Project::workProgress).collect(Collectors.toList());
        return projectRepository.findProjectByMembers_Id(user.getId()).stream().peek(Project::workProgress).collect(Collectors.toList());
    }

    public Project getProject(Long id, String username) throws RuntimeException {

        Project project = projectRepository.findProjectByIdIs(id);
        User user = userService.getUser(username);
        if (!userValidator.projectMemberById(id, username))
            throw new RuntimeException("Нет доступа к данному проекту");
        project.workProgress();
        List<Task> tasks = project.getTasks();
        List<Task> taskToDelete = tasks.stream()
                .filter(t -> {
                    if (userValidator.projectOwnerByTaskId(t.getId(), username))
                        return false;
                    return Status.ARCHIVED.equals(t.getStatus());
                })
                .collect(Collectors.toList());
        tasks.removeAll(taskToDelete);
        project.setTasks(tasks);
        return project;
    }

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

    public Project getProjectsForTask(Long taskId) {
        Task task = taskRepository.getTasksByIdIs(taskId);
        System.out.println(task);
        return projectRepository.findProjectByIdIs(task.getProject());
    }
}
