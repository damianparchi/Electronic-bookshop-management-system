package com.example.backend.service;


import com.example.backend.entity.Checkout;

import javax.transaction.Transactional;
import java.util.List;

public interface ICheckoutService {

    Checkout checkout(String token, Long bookId, Long userdataId);


    List<Checkout> getallCheckouts();

    @Transactional
    List<Checkout> getCheckoutList(String token);

    int updateCheckoutStatus(String status, long checkoutId);

    List<Checkout> getCheckouts();

    boolean deleteOrderFromHistory(long checkoutId, String token);
}
