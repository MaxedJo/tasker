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

    @Column(columnDefinition = "TEXT")
    private String description;

    @Transient
    private Long activeTasks;

    @Transient
    private Long completedTasks;

    public void workProgress() {
        activeTasks = tasks.stream().filter(task -> task.getStatus() != Status.ARCHIVED).count();
        completedTasks = tasks.stream().filter(task -> task.getStatus() == Status.CLOSED).count();
    }
}
