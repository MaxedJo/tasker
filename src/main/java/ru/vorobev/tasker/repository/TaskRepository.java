package ru.vorobev.tasker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.vorobev.tasker.model.Task;


@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
     Task getTasksByIdIs(Long id);

     void deleteTaskByIdIs(Long id);
}
