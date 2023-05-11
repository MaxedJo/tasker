package ru.vorobev.tasker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.vorobev.tasker.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
}
