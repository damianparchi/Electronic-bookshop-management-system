package com.example.backend.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;
    private Long userId;
    private String bookName;
    private String author;
    private Double cost;
    private Long quantityOfBooks;
    private String status;
    private String bookDesc;
    private String bookCover;

}
