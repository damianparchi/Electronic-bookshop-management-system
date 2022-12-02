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
        addUserData.setImie(userData.getImie());
        addUserData.setNazwisko(userData.getNazwisko());
        addUserData.setNrTel(userData.getNrTel());
        addUserData.setMiasto(userData.getMiasto());
        addUserData.setUlica(userData.getUlica());
        addUserData.setNrMieszkaniaDomu(userData.getNrMieszkaniaDomu());
        addUserData.setKodPocztowy(userData.getKodPocztowy());
        userDataRepository.save(addUserData);
        user.getUserData().add(addUserData);
        return addUserData;
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
