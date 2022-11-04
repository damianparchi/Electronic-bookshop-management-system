package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
