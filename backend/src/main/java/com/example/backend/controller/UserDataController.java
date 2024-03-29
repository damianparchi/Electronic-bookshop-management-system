package com.example.backend.controller;

import com.example.backend.dto.UpdateUserDataDTO;
import com.example.backend.dto.UserDataDTO;
import com.example.backend.entity.Book;
import com.example.backend.entity.User;
import com.example.backend.entity.UserData;
import com.example.backend.response.BookResponse;
import com.example.backend.response.UserDataResponse;
import com.example.backend.service.UserDataService;
import com.example.backend.response.Response;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class UserDataController {
    @Autowired
    private UserDataService userDataService;

    @PostMapping("/userdata/add")
    public ResponseEntity<Response> addUserData(@RequestBody UserDataDTO userData, @RequestHeader String token) throws Exception {
        UserData userDataS = userDataService.addUserData(userData, token);

        if (userDataS != null) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("informacje dodane", 200, userDataS));
        } else {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("informacje nie dodane", 400, userDataS));
        }
    }
    @GetMapping("/userdata/info")
    public ResponseEntity<Response> getUserDataByUserId(@RequestHeader String token) {
        List<UserData> result = userDataService.getUserDataByUserId(token);
        if(result != null) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("get userinfo", 200, result));

        }
        return null;
    }

    @GetMapping("/usersdata/info")
    public ResponseEntity<Response> getAllUsersData() {
        List<UserData> result = userDataService.getUsersData();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("get usersinfo", 200, result));
    }

    @PutMapping("/userdata/update")
    public ResponseEntity<Response> updateAddress(@RequestHeader String token, @RequestBody UpdateUserDataDTO userData) {
        UserData userDataS = userDataService.updateUserData(userData, token);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("edycja powiodła się", 200, userDataS));
    }

    @GetMapping("/userdatainfo/{userdataId}")
    public ResponseEntity<UserDataResponse> getUserDataInformation(@PathVariable("userdataId") Long userdataId) {
        UserData info = userDataService.getUserInfo(userdataId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new UserDataResponse("userdataId getting", info));
    }



}
