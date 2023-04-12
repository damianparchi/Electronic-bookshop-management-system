package com.example.backend.controller;

import com.example.backend.dto.BasketDTO;
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
        int basketDetails = basketService.getBookSumUp(token);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("Liczba ksiazek w koszyku", 200, basketDetails));
    }

    @DeleteMapping("ksiegarnia/basket/deleteBooksFromBasket/{bookId}")
    public ResponseEntity<Response> deleteBooksFromBasket(@RequestHeader(name="token") String token ,@PathVariable Long bookId) throws Exception {
        System.out.println("jjjjjjjjjjj"+ token + bookId);
        boolean basketDetails = basketService.deleteBook(token,bookId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("book removed from cart", 200,basketDetails));
    }

    @PutMapping("ksiegarnia/basket/minusBook")
    public ResponseEntity<Response> minusBook(@RequestHeader(name="token") String token,@RequestParam("bookId") Long bookId,@RequestBody BasketDTO bookAmount) throws Exception {
        BasketProduct basketDetails = basketService.minusBook(token, bookId, bookAmount);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body
                (new Response("odjęto 1 książkę", 200, basketDetails));
    }

    @PutMapping("ksiegarnia/basket/plusBook")
    public ResponseEntity<Response> descreaseBooksQuantity(@RequestHeader(name="token") String token,@RequestParam("bookId") Long bookId,@RequestBody BasketDTO bookAmount) throws Exception {
        BasketProduct basketDetails = basketService.plusBook(token, bookId, bookAmount);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body
                (new Response("decreased 1 quantity of book ", 200, basketDetails));
    }


}
