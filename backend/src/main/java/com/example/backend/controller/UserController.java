package com.example.backend.controller;

import com.example.backend.entity.Checkout;
import com.example.backend.entity.User;
import com.example.backend.exception.UserException;
import com.example.backend.request.ChangePassword;
import com.example.backend.request.LoginInfo;
import com.example.backend.request.NewPassword;
import com.example.backend.response.UserDetailResponse;
import com.example.backend.service.CheckoutService;
import com.example.backend.service.ICheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.UserDto;
import com.example.backend.response.Response;
import com.example.backend.service.UserServices;
import com.example.backend.util.JwtGenerator;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserServices service;

    @Autowired
    private JwtGenerator jwtGenerator;

    @Autowired
    private ICheckoutService checkoutService;

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

    @GetMapping(value = "/userbooks/{token}")
    public ResponseEntity<Response> getOrderlist(@PathVariable("token") String token) throws Exception {

        List<Checkout> orderdetails = checkoutService.getCheckoutList(token);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("placed orderlist", 200, orderdetails));

    }

    @GetMapping("/user/verify/{token}")
    public ResponseEntity<Response> userVerification(@PathVariable("token") String token) throws Exception {
        boolean update = service.verify(token);
        if (update)
        {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("verified", 200));
        }
        else
        {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("not verified", 400));
        }
    }

    @GetMapping("/userinfo/{token}")
    public ResponseEntity<Response> getUserInformation(@RequestHeader String token) {
        String result = service.getUserInfo(token);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("get userinfo", 200, result));
    }

    @PostMapping("user/remindpassword")
    public ResponseEntity<Response> forgotPassword(@RequestBody NewPassword newPassword) {

        boolean result = service.isUserAlive(newPassword.getEmail());
        if (result) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("Check your email: Email sent", 200));
        } else {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("user does not exist with given email id", 400));
        }
    }

    @PutMapping("user/updatepassword/{token}")
    public ResponseEntity<Response> update(@PathVariable("token") String token, @RequestBody ChangePassword changePassword) {
        System.out.println("inside" + token);
        boolean result = service.updatePassword(changePassword, token);
        if (result) {
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(new Response("password updated successfully", 200));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new Response("password doesn't match", 401));
        }


    }









  //  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6MX0.0rHyLThGA_06cwyfLSZpIGV90ZVbNKiejUB671MRnetaeFeOpivTFe9yOrQBC_3QtNWHHjEAnasHi-ADPnR7OQ
}
