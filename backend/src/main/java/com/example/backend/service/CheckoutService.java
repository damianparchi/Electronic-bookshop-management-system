package com.example.backend.service;

import com.example.backend.entity.Checkout;

import java.util.List;

public interface CheckoutService {
    Checkout checkout(String token, Long bookId, Long userdataId);

    List<Checkout> getCheckouts();

    List<Checkout> getOrderList(String token);

    int updateCheckoutStatus(String status, long checkoutId);
}
