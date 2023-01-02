package com.example.backend.controller;

import com.example.backend.entity.Checkout;
import com.example.backend.response.Response;
import com.example.backend.service.CheckoutService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @ApiOperation(value = "get all order desc for admin")
    @GetMapping(value = "admin/checkouts")
    public ResponseEntity<Response> getallOrders() throws Exception {

        List<Checkout> orderinfo = checkoutService.getCheckouts();
        System.out.println("checkout id: "+orderinfo);
        return ResponseEntity.status(HttpStatus.OK).body(new Response("checkout lists: ",200,orderinfo));

    }

    @ApiOperation(value = "Change Order Status by admin ")
    @PutMapping(value = "bookstore/orderStatusByAdmin")
    public ResponseEntity<Response> updateCheckoutStatus(@RequestParam String status,@RequestParam long checkoutId,@RequestHeader("token") String token) throws Exception {

        int orderStatusResult = checkoutService.updateCheckoutStatus(status,checkoutId);
        System.out.println("orderStatusResult :"+orderStatusResult);
        return ResponseEntity.status(HttpStatus.OK).body(new Response(checkoutId+" order status updated ",200,orderStatusResult));

    }
}
