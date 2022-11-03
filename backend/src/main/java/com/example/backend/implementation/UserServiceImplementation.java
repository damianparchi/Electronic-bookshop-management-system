package com.example.backend.implementation;

import com.example.backend.exception.UserException;
import com.example.backend.repo.IUserRepository;
import com.example.backend.service.UserService;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


public class UserServiceImplementation implements UserService {
    private User users = new User();

    @Autowired
    private IUserRepository iUserRepository;

    @Override
    public List<User> getUser() {
        return null;
    }

    @Override
    @Transactional
    public boolean register(UserDto information) {
        User user = iUserRepository.getUser(information.getEmail());
        if (user == null){
//            users.setCreatedDate(LocalDateTime.now());
//            users.setVerified(false);
            String epassword = information.getPassword();
            users.setPassword(epassword);
            System.out.println("password is" + epassword);
            users = iUserRepository.save(users);
            return true;
        } else {
            throw new UserException("Uzytkownik o takim emailu juz istnieje");
        }
    }
}
