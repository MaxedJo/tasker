package ru.vorobev.tasker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User owner;

    @ManyToMany
    private List<User> members;

    @OneToMany(mappedBy = "project")
    private List<Task> tasks;

    private String title;

    private String description;
}
