package com.example.backend.service;

import com.example.backend.entity.Checkout;

public interface CheckoutService {
    Checkout checkout(String token, Long bookId, Long userdataId);
}
