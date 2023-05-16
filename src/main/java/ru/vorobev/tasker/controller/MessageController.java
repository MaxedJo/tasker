package ru.vorobev.tasker.controller;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.vorobev.tasker.model.Message;
import ru.vorobev.tasker.repository.MessageRepository;

@Controller
@RequestMapping("/message")
@CrossOrigin
@AllArgsConstructor
public class MessageController {
    private final MessageRepository messageRepository;

    @PostMapping("/send")
    public void getAll(@RequestBody Message message) {
        messageRepository.save(message);
    }
}
