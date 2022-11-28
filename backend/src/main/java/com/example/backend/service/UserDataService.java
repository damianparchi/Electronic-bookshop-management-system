package com.example.backend.service;

import com.example.backend.dto.UserDataDTO;
import com.example.backend.entity.UserData;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserDataService {

    @Transactional
    UserData addUserData(UserDataDTO userDataDTO, String token);
}
