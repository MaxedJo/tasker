package ru.vorobev.tasker.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.vorobev.tasker.model.Change;
import ru.vorobev.tasker.repository.ChangeRepository;
import ru.vorobev.tasker.repository.UserRepository;
import ru.vorobev.tasker.util.UserValidator;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChangeService {

    private final ChangeRepository changeRepository;
    private final UserRepository userRepository;
    private final UserValidator userValidator;

    public List<Change> getChangesByTaskId(Long taskId, String username) {

        if (!userValidator.projectMemberByTaskId(taskId, username)) {
            throw new RuntimeException("You are not a member of this project");
        }
        List<Change> changes = changeRepository.getChangesByTaskIs(taskId);
        changes.forEach(change -> change.setUsername(
                userRepository.findUserByIdIs(change.getAuthor()).getFio()));
        return changes;
    }
}
