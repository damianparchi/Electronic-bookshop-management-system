package com.example.backend.controller;

import com.example.backend.entity.Checkout;
import com.example.backend.response.BookResponse;
import com.example.backend.response.Response;
import com.example.backend.service.IBookService;
import com.example.backend.service.ICheckoutService;
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
    IBookService bookService;

    @Autowired
    private ICheckoutService CheckoutService;

    @PostMapping("ksiegarnia/checkout")
    public ResponseEntity<Response> checkout(@RequestHeader String token, @RequestParam Long bookId, @RequestParam Long userdataId) {
        Checkout checkout = CheckoutService.checkout(token, bookId, userdataId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("Książka zamówiona!", 200, checkout));
    }

    @ApiOperation(value = "get all order desc for admin")
    @GetMapping(value = "ksiegarnia/checkouts")
    public ResponseEntity<Response> getallCheckouts() throws Exception {

        List<Checkout> orderinfo = CheckoutService.getCheckouts();
        System.out.println("checkout id: "+orderinfo);
        return ResponseEntity.status(HttpStatus.OK).body(new Response("checkout lists: ",200,orderinfo));

    }

    @ApiOperation(value = "Change Order Status by admin ")
    @PutMapping(value = "ksiegarnia/updateOrderStatusByAdmin")
    public ResponseEntity<Response> updateCheckoutStatus(@RequestParam String status,@RequestParam long checkoutId,@RequestHeader("token") String token) throws Exception {

        int orderStatusResult = CheckoutService.updateCheckoutStatus(status,checkoutId);
        System.out.println("orderStatusResult :"+orderStatusResult);
            return ResponseEntity.status(HttpStatus.OK).body(new Response(checkoutId+" order status updated ",200,orderStatusResult));

    }

    @ApiOperation(value = "get allorder detrails for admin")
    @GetMapping(value = "ksiegarnia/getCheckoutsByAdmin")
    public ResponseEntity<Response> getallOrders() throws Exception {

        List<Checkout> orderinfo = CheckoutService.getallCheckouts();
        System.out.println("order ids: "+orderinfo);
        return ResponseEntity.status(HttpStatus.OK).body(new Response(" orders list ",200,orderinfo));

    }

    @DeleteMapping("ksiegarnia/deleteOrderFromHistory/{checkoutId}")
    public ResponseEntity<BookResponse> deleteBook(@PathVariable long checkoutId, @RequestHeader("token") String token) {
        boolean odp = CheckoutService.deleteOrderFromHistory(checkoutId, token);
        if (odp)
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new BookResponse(202, "Zamówienie usunięte z historii!"));
        return null;
    }


}
