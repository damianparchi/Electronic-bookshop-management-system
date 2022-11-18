package com.example.backend.controller;

import com.example.backend.entity.BasketProduct;
import com.example.backend.response.Response;
import com.example.backend.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class BasketController {

    @Autowired
    private BasketService basketService;

    @PostMapping("ksiegarnia/basket/addBookToBasket/{bookId}")
    public ResponseEntity<Response> addBookToBasket(@RequestHeader String token, @PathVariable long bookId) throws Exception {
        List<BasketProduct> basketProd = basketService.addBookToBasket(token, bookId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("Książka dodana do koszyka.", 200, basketProd));
    }

    @GetMapping("ksiegarnia/basket/getBooksinBasket")
    public ResponseEntity<Response> getBooksinBasket(@RequestHeader(name="token")  String token) throws Exception {
        List<BasketProduct> basketProducts = basketService.getBooksFromBasket(token);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("Książki w koszyku", 200, basketProducts));
    }

    @GetMapping("ksiegarnia/basket/bookSumUp")
    public ResponseEntity<Response> getBooksCount(@RequestHeader(name="token") String token) throws Exception {
        int cartdetails = basketService.getBookSumUp(token);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("Liczba ksiazek w koszyku", 200,cartdetails));
    }


}
