package ru.vorobev.tasker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.vorobev.tasker.model.Change;

import java.util.List;

@Repository
public interface ChangeRepository extends JpaRepository<Change, Long> {
    List<Change> getChangesByTaskIsOrderByChangeTimeAsc(Long taskId);

}
