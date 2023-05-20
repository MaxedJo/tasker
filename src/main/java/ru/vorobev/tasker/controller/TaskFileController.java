package ru.vorobev.tasker.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.vorobev.tasker.controller.dto.FileResponse;
import ru.vorobev.tasker.model.TaskFile;
import ru.vorobev.tasker.service.TaskFileService;

import java.io.*;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/files")
@RequiredArgsConstructor
public class TaskFileController {
    private final TaskFileService taskFileService;

    @PostMapping("/upload/{taskId}")
    public TaskFile uploadFile(@RequestParam("file") MultipartFile file, @PathVariable Long taskId, Principal principal) {
        return taskFileService.save(file, taskId, principal.getName());
    }

    @GetMapping("/{taskId}")
    public List<FileResponse> findAllByTaskId(@PathVariable Long taskId) {
        List<FileResponse> files = taskFileService.findAllByTaskId(taskId).map(file -> {
                    String fileDownloadUri = ServletUriComponentsBuilder
                            .fromCurrentContextPath()
                            .path("/files/")
                            .path(file.getId().toString())
                            .toUriString();
                    return FileResponse.builder()
                            .fileType(file.getFileType())
                            .fileId(file.getId())
                            .fileName(file.getFileName())
                            .fileDownloadUri(fileDownloadUri)
                            .size((file.getFileSize()))
                            .build();
                })
                .collect(Collectors.toList());
        return files;
    }

    @SneakyThrows
    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> findById(@PathVariable Long id) {
        TaskFile file = taskFileService.findById(id);
        Path path = Paths.get("files/" + file.getId() + "/" + file.getFileName());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, file.getFileType())
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFileName() + "\"")
                .body(Files.readAllBytes(path));
    }

    @RequestMapping("/file/{fileName:.+}")
    public void downloadPDFResource(HttpServletRequest request, HttpServletResponse response,
                                    @PathVariable("fileName") Long id) throws IOException {
        TaskFile files = taskFileService.findById(id);
        Path path = Paths.get("files/" + files.getId() + "/" + files.getFileName());
        File file = path.toFile();
        if (file.exists()) {

            String mimeType = URLConnection.guessContentTypeFromName(file.getName());
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }

            response.setContentType(mimeType);
            response.setHeader("Content-Disposition", String.format("inline; filename=\"" + file.getName() + "\""));
            response.setContentLength((int) file.length());

            InputStream inputStream = new BufferedInputStream(new FileInputStream(file));

            FileCopyUtils.copy(inputStream, response.getOutputStream());

        }
    }


    @GetMapping("/delete/{id}")
    public void findById(@PathVariable Long id, Principal principal) {
        taskFileService.delete(id, principal.getName());
    }
}
