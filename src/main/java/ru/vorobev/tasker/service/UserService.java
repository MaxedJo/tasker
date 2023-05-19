package ru.vorobev.tasker.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vorobev.tasker.mapper.UserMapper;
import ru.vorobev.tasker.model.User;
import ru.vorobev.tasker.repository.UserRepository;

import java.util.List;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper mapper;


    public User getUser(String username) {
        return userRepository.findByUsername(username).get();
    }

    public List<User> getUsers() {
        log.info("Getting all users");
        return userRepository.findAll();
    }

    public User createUser(User user) {
        log.info("New User created");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        var old = userRepository.findByUsername(user.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        mapper.updateCustomerFromDto(user, old);
        System.out.println("||" + user);
        System.out.println(old);
        return userRepository.save(old);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
