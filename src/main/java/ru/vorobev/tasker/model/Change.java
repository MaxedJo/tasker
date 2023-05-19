package ru.vorobev.tasker.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.With;

import java.time.LocalDateTime;

@With
@Entity
@Builder
public class Change {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "author_id")
    private Long author;

    @Column(name = "task_id")
    private Long task;

    @Column(name = "change_time")
    private LocalDateTime changeTime;

    @Enumerated(EnumType.STRING)
    private Field field;

    @Column(name = "old_value", columnDefinition = "TEXT")
    private String oldValue;

    @Column(name = "new_value", columnDefinition = "TEXT")
    private String newValue;

}
