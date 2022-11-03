package com.example.backend.repo;

import com.example.backend.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUserRepository {

    User save(User user);
    User getUser(String email);
    List<User> getUser();
}
