package com.example.backend.controller;

import com.example.backend.repo.UserRepository;
import com.example.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

//    @Autowired
//    UserService userService;

    @Autowired
    private UserRepository userRepository;

//    @PostMapping("/register")
//    public ResponseEntity<Response> registration(@RequestBody UserDto information) {
//        System.out.println("user info" + information.toString());
//        boolean result = userService.register(information);
//        if(result) {
//            return ResponseEntity.status(HttpStatus.CREATED)
//                    .body(new Response("rejestracja pomyslna", 200, information));
//        } else {
//            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED)
//                    .body(new Response("Uzytkownik juz istnieje", 400, information));
//        }
//    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userRepository.save(user));
    }
}
