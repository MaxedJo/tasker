package ru.vorobev.tasker.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.vorobev.tasker.model.Change;
import ru.vorobev.tasker.repository.ChangeRepository;
import ru.vorobev.tasker.repository.UserRepository;
import ru.vorobev.tasker.util.UserValidator;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChangeService {

    private final ChangeRepository changeRepository;
    private final UserRepository userRepository;
    private final UserValidator userValidator;

    public List<Change> getChangesByTaskId(Long taskId, String username) {

        if (!userValidator.projectMemberByTaskId(taskId, username)) {
            throw new RuntimeException("Вы не участник данного проекта");
        }
        List<Change> changes = changeRepository.getChangesByTaskIsOrderByChangeTimeDesc(taskId);
        changes.forEach(change -> change.setUsername(
                userRepository.findUserByIdIs(change.getAuthor()).getFio()));
        Collections.reverse(changes);
        return changes;
    }
}
