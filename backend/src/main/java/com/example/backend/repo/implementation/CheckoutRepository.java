package com.example.backend.repo.implementation;

import com.example.backend.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    @Query( value = "select * from Checkout", nativeQuery = true)
    List<Checkout> getCheckout();

    @Modifying
    @Query("update Checkout set checkout_status=:status where checkout_id=:checkoutId")
    int CheckoutStatusDefault(String status,long checkoutId);

}
