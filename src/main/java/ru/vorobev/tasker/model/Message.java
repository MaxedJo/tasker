package ru.vorobev.tasker.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "author_id")
    private Long author;

    @Column(name = "task_id")
    private Long task;

    @Column(name = "local_date_time", columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
    private LocalDateTime localDateTime;

    @Column(columnDefinition = "TEXT")
    private String text;
}
