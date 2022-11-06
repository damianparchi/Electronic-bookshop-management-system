package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.exception.UserException;
import com.example.backend.request.LoginInfo;
import com.example.backend.response.UserDetailResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.UserDto;
import com.example.backend.response.Response;
import com.example.backend.service.UserServices;
import com.example.backend.util.JwtGenerator;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserServices service;

    @Autowired
    private JwtGenerator jwtGenerator;

    @PostMapping("/register")
    public ResponseEntity<Response> registration(@RequestBody UserDto information) {
        boolean wynik = service.register(information);
        if(wynik) {
            return ResponseEntity.status(HttpStatus.CREATED).body(new Response("rejestracja pomyslna", 200, information));
        } else {
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(new Response("Uzytkownik juz istnieje", 400, information));
        }
    }

    @PostMapping("/user/login")
    public ResponseEntity<UserDetailResponse> login(@RequestBody LoginInfo information) {
        User users = service.login(information);
        if (users != null) {
            String token = jwtGenerator.jwtToken(users.getUserId());
            return ResponseEntity.status(HttpStatus.ACCEPTED).header("logowanie powiodło się!", information.getEmail()).body(new UserDetailResponse(token, 200, users));

        } else {
            throw new UserException("Błędne dane");
        }
    }
}
