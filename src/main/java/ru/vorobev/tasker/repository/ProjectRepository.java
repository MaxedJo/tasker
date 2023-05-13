package ru.vorobev.tasker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.vorobev.tasker.model.Project;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findProjectByIdIs(Long id);

    List<Project> findProjectByMembers_Id(Long id);

    void deleteProjectByIdIs(Long id);

}
