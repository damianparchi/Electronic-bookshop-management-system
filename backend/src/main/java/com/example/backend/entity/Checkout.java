package com.example.backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Checkout {

    public Checkout() {

    }
    @Id
    private Long checkoutId;

    private LocalDateTime checkoutTime;

    private String checkoutStatus;

    private Double inTotalCost;

    private Long userdataId;

    @OneToMany
    (cascade = CascadeType.ALL, targetEntity = Amount.class)
    @JoinColumn(name = "checkoutId")
    private List<Amount> amountOfBooks;

    @ManyToMany(cascade =  CascadeType.ALL)
    private List<Book> BooksList;



    public Checkout(Long checkoutId, LocalDateTime checkoutTime, List<Amount> amountOfBooks,
                 List<Book> booksList) {
        super();
        this.checkoutId = checkoutId;
        this.checkoutTime = checkoutTime;
        amountOfBooks = amountOfBooks;
        BooksList = booksList;
    }









}
