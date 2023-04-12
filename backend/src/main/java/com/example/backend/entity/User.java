package com.example.backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long  userId;
    private String username;
    private String  email;
    private String  password;
//    private Long mobileNumber;
    private LocalDateTime createdDate;
    private boolean isVerified;
    private String role;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = UserData.class)
    @JoinColumn(name = "userId")
    private List<UserData> userData;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = BasketProduct.class)
    @JoinColumn(name = "userId")
    private List<BasketProduct> BooksInBasket;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = Checkout.class)
    @JoinColumn(name = "userId")
    private List<Checkout> checkoutBooksDesc;

}
