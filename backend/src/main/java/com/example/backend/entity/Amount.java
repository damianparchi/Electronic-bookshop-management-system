package com.example.backend.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Amount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long booksAmount;
    private Double cost;

    public void setCost(Double cost) {
    }

    public void setbooksAmount(long amount) {
    }
}
