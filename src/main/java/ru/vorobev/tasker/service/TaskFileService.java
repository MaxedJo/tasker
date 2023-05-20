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

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
//        return new File("/HELP.md");
    }

    @SneakyThrows
    public TaskFile save(MultipartFile file, Long taskId, String username) {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        TaskFile taskFile = TaskFile.builder()
                .fileSize((long) file.getBytes().length)
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
        TaskFile created = taskFileRepository.save(taskFile);
        if (!file.isEmpty()) {
            byte[] bytes = file.getBytes();
            Path directory = Paths.get("files/" + created.getId());
            Path path = Paths.get("files/" + created.getId() + "/" + file.getOriginalFilename());
            Files.createDirectories(directory);
            Files.write(path, bytes);
        }
        return created;
    }

    public Stream<TaskFile> findAllByTaskId(Long taskId) {
        return taskFileRepository.findAllByTaskId(taskId).stream();
    }

    @SneakyThrows
    public void delete(Long id, String username) {
        TaskFile file = taskFileRepository.findById(id).orElseThrow();
        Files.deleteIfExists(Paths.get("files/" + id + "/" + file.getFileName()));
        Files.deleteIfExists(Paths.get("files/" + id));
        changeRepository.save(Change.builder()
                .task(file.getTaskId())
                .changeTime(LocalDateTime.now())
                .author(userService.getUser(username).getId())
                .oldValue(file.getFileName())
                .field(Field.FILE_DELETE)
                .build());
        System.out.println(id);
        taskFileRepository.deleteById(id);
    }
}
