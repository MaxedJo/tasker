package ru.vorobev.tasker.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatusValues {
    private String status;
    private String description;
}
