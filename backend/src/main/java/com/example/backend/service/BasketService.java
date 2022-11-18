package com.example.backend.service;

import com.example.backend.entity.BasketProduct;

import java.util.List;
public interface BasketService {

    List<BasketProduct> addBookToBasket(String token, long bookId);

    List<BasketProduct> getBooksFromBasket(String token);

    int getBookSumUp(String token);
}
