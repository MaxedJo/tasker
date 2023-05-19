package ru.vorobev.tasker.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class FileResponse {
    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private Long fileId;
    private Long size;
}
