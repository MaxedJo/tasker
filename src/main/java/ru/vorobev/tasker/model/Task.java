package ru.vorobev.tasker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(255) default 'OPENED'")
    private Status status;

    @Column(name = "project_id")
    private Long project;

    @Column(name = "owner_id")
    private Long owner;

    @Column(name = "user_id")
    private Long user;

    @OneToMany(mappedBy = "task")
    private List<Message> messages;

    private LocalDate deadline;

}
