package com.example.backend.service;

import com.example.backend.entity.Checkout;

import java.util.List;

public interface CheckoutService {
    List<Checkout> getOrderList(String token);
}
