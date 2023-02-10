package com.example.backend.implementation;

import com.example.backend.entity.Checkout;
import com.example.backend.entity.User;
import com.example.backend.repo.UserRepository;
import com.example.backend.service.CheckoutService;
import com.example.backend.util.JwtGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CheckoutServiceListImpl implements CheckoutService {

    @Autowired
    private JwtGenerator generator;

    @Autowired
    private UserRepository userRepository;
    @Transactional
    @Override
    public List<Checkout> getOrderList(String token) {
        long id = generator.parseJWT(token);
        User userdetails = userRepository.findById(id)
                .orElseThrow(null);

        return userdetails.getCheckoutBooksDesc();

    }
}
