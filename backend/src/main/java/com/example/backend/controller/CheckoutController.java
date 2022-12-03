package com.example.backend.controller;

import com.example.backend.entity.Checkout;
import com.example.backend.response.Response;
import com.example.backend.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @PostMapping("ksiegarnia/checkout")
    public ResponseEntity<Response> checkout(@RequestHeader String token, @RequestParam Long bookId, @RequestParam Long userdataId) {
        Checkout checkout = checkoutService.checkout(token, bookId, userdataId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("Książka zamówiona!", 200, checkout));
    }
}
