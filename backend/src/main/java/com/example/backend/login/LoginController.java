package com.example.backend.login;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/login")
@AllArgsConstructor
public class LoginController {

    @PostMapping("login")
    public String login() {
        return "login";
    }
}
