package ru.vorobev.tasker.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.vorobev.tasker.controller.dto.FileResponse;
import ru.vorobev.tasker.model.TaskFile;
import ru.vorobev.tasker.service.TaskFileService;

import java.io.*;
import java.net.URLConnection;
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

    @RequestMapping("/files/{id}")
    public void downloadPDFResource(HttpServletRequest request, HttpServletResponse response,
                                    @PathVariable Long id) throws IOException {
        TaskFile fileDB = taskFileService.findById(id);
        Path path = Paths.get("files/" + fileDB.getId() + "/" + fileDB.getFileName());
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
