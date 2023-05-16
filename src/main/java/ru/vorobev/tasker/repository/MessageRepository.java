package ru.vorobev.tasker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.vorobev.tasker.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
}
