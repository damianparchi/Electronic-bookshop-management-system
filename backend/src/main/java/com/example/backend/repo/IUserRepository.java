package com.example.backend.repo;

import com.example.backend.entity.User;
import com.example.backend.request.ChangePassword;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUserRepository {

    User save(User users);
    User getUser(String email);
    List<User> getUser();

    boolean verify(Long id);

    boolean changePassword(ChangePassword credentials, Long token);

    User getUserById(Long id);
}
