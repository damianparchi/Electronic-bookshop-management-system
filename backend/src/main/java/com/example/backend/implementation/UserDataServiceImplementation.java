package com.example.backend.implementation;

import com.example.backend.dto.UpdateUserDataDTO;
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

import java.util.ArrayList;
import java.util.List;

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
    public UserData addUserData(UserDataDTO userData, String token) {
        Long id = generator.parseJWT(token);
        UserData addUserData = new UserData(userData);
        User user = userRepository.findById(id).orElseThrow(null);
        user.getUserData().add(addUserData);
        return userDataRepository.save(addUserData);
    }

    @Override
    public UserData updateUserData(UpdateUserDataDTO userData, String token) {
        List<UserData> list=new ArrayList<>();

        Long id = generator.parseJWT(token);
        User user = userRepository.findById(id).orElseThrow(null);
        UserData addUserData= userDataRepository.findById(userData.getUserdataId()).get();
        addUserData.setUserdataId((userData.getUserdataId()));
        addUserData.setName(userData.getName());
        addUserData.setSurname(userData.getSurname());
        addUserData.setMobilePhone(userData.getMobilePhone());
        addUserData.setCity(userData.getCity());
        addUserData.setStreet(userData.getStreet());
        addUserData.setHouseApartmentNr(userData.getHouseApartmentNr());
        addUserData.setProvince(userData.getProvince());
        addUserData.setPostcode(userData.getPostcode());
        addUserData.setCardNumber(userData.getCardNumber());
        addUserData.setExpirationDate(userData.getExpirationDate());
        addUserData.setCvvnumber(userData.getCvvnumber());
        userDataRepository.save(addUserData);
        user.getUserData().add(addUserData);
        return addUserData;
    }

    @Override
    public UserData getUserInfo(Long userdataId) {
        UserData userData = userDataRepository.getbyId(userdataId);
        if (userData != null) {
            return userData;
        }
        return null;
    }

    @Override
    public List<UserData> getUsersData() {
        List<UserData> alluserinfo = userDataRepository.getUsersData();
        return alluserinfo;
    }

    @Override
    public List<UserData> getUserDataByUserId(String token) {
        Long id = generator.parseJWT(token);
        User user = userRepository.findById(id).orElseThrow(null);
        try {
            List<UserData> userData = userDataRepository.findAddressByUserId(id);
            if (userData != null) {
                return userData;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


}
