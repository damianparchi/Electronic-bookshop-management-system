package com.example.backend.service;

import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;
import com.example.backend.request.LoginInfo;

import java.util.List;

/**
 * @author HP
 *
 */
public interface UserServices {

    boolean register(UserDto information);
    //boolean verify(String token) throws Exception;
    //boolean isUserExist(String email);
    //boolean update(PasswordUpdate information, String token);
    List<User> getUser();

    User login(LoginInfo information);
    //User getSingleUser(String token);
}
