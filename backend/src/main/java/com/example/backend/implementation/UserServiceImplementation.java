package com.example.backend.implementation;

import com.example.backend.exception.UserException;
import com.example.backend.repo.*;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;
import com.example.backend.service.UserServices;
import com.example.backend.util.JwtGenerator;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@Log4j2
public class UserServiceImplementation implements UserServices {
    private User users = new User();

    @Autowired
    private IUserRepository iUserRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private JwtGenerator generate;

    @Override
    public List<User> getUser() {
        return null;
    }

    @Override
    @Transactional
    public boolean register(UserDto information) {

        User user = iUserRepository.getUser(information.getEmail());

        if (user == null) {
            users = modelMapper.map(information, User.class);
            users.setCreatedDate(LocalDateTime.now());
            String ppassword = encoder.encode(information.getPassword());
            users.setPassword(ppassword);
            users.setVerified(false);
            users = iUserRepository.save(users);
            System.out.println("wygenerowany token:" + generate.jwtToken(users.getUserId()));
            return true;
        } else {
            throw new UserException("Uzytkownik o takim emailu juz istnieje");
        }
    }
}
