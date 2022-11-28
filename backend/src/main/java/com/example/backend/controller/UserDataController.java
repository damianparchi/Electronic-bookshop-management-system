package com.example.backend.controller;

import com.example.backend.dto.UserDataDTO;
import com.example.backend.entity.UserData;
import com.example.backend.service.UserDataService;
import com.example.backend.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class UserDataController {
    @Autowired
    private UserDataService userDataService;

    @PostMapping("/userdata/add")
    public ResponseEntity<Response> addUserData(@RequestBody UserDataDTO userData, @RequestHeader String token)
            throws Exception {
        System.out.println("adress is" + userData);
        UserData userDataS = userDataService.addUserData(userData, token);

        if (userDataS != null) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("informacje dodane", 200, userDataS));
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("informacje nie dodane", 400, userDataS));

    }
}
