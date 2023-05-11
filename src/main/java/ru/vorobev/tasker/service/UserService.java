package ru.vorobev.tasker.service;

import ru.vorobev.tasker.model.User;

import java.util.List;

public interface UserService {
    User getUser(String username);
    List<User> getUsers();
    User createUser(User user);
    User updateUser(User user);
}
