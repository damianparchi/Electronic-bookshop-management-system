package com.example.backend.service;

import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService {
    List<User> getUser();
    boolean register(UserDto information);
}
