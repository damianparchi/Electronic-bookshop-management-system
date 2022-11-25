package com.example.backend.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Amount{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long amount_id;
    @Column
    private Long booksAmount;
    @Column
    private Double totalCost;
}
