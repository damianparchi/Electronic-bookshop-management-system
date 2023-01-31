package com.example.backend.service;

import com.example.backend.dto.UpdateUserDataDTO;
import com.example.backend.dto.UserDataDTO;
import com.example.backend.entity.UserData;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDataService {

    UserData addUserData(UserDataDTO userDataDTO, String token);

    List<UserData> getUserDataByUserId(String token);

    UserData updateUserData(UpdateUserDataDTO userData, String token);

    UserData getUserInfo(Long userdataId);


    List<UserData> getUsersData();
}
