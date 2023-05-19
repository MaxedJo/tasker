package ru.vorobev.tasker.service;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import ru.vorobev.tasker.model.Change;
import ru.vorobev.tasker.model.Field;
import ru.vorobev.tasker.model.TaskFile;
import ru.vorobev.tasker.repository.ChangeRepository;
import ru.vorobev.tasker.repository.TaskFileRepository;

import java.time.LocalDateTime;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class TaskFileService {
    private final TaskFileRepository taskFileRepository;
    private final ChangeRepository changeRepository;
    private final UserService userService;

    public TaskFile findById(Long id) {
        return taskFileRepository.findById(id).orElseThrow();
    }

    @SneakyThrows
    public TaskFile save(MultipartFile file, Long taskId, String username) {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        TaskFile taskFile = TaskFile.builder()
                .fileData(file.getBytes())
                .fileName(filename)
                .taskId(taskId)
                .fileType(file.getContentType())
                .build();
        changeRepository.save(Change.builder()
                .task(taskId)
                .changeTime(LocalDateTime.now())
                .author(userService.getUser(username).getId())
                .oldValue(filename)
                .field(Field.FILE_ADD)
                .build());
        return taskFileRepository.save(taskFile);
    }

    public Stream<TaskFile> findAllByTaskId(Long taskId) {
        return taskFileRepository.findAllByTaskId(taskId).stream();
    }

    public void delete(Long id, String username) {
        TaskFile file = taskFileRepository.findById(id).orElseThrow();
        changeRepository.save(Change.builder()
                .task(file.getTaskId())
                .changeTime(LocalDateTime.now())
                .author(userService.getUser(username).getId())
                .oldValue(file.getFileName())
                .field(Field.FILE_DELETE)
                .build());
        taskFileRepository.deleteById(id);
    }
}
