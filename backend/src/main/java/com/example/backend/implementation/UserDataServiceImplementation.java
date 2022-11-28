package com.example.backend.implementation;

import com.example.backend.dto.UserDataDTO;
import com.example.backend.entity.User;
import com.example.backend.entity.UserData;
import com.example.backend.repo.UserRepository;
import com.example.backend.repo.implementation.UserDataRepository;
import com.example.backend.service.UserDataService;
import com.example.backend.util.JwtGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDataServiceImplementation implements UserDataService {

    @Autowired
    private JwtGenerator generator;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDataRepository userDataRepository;

    @Transactional
    @Override
    public UserData addUserData(UserDataDTO userDataDTO, String token) {
        Long id = generator.parseJWT(token);
        UserData userData = new UserData(userDataDTO);
        System.out.println(userData.getMiasto()+"->"+userData.getUlica());
        User user = userRepository.findById(id).orElseThrow(null);
        user.getUserData().add(userData);
        return userDataRepository.save(userData);
    }
}
