package com.example.backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class BasketProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long prodId;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Book> booksList;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = Amount.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "prodId")
    private List<Amount> booksAmount;

    private LocalDateTime createdAt;

    public List<Book> getBooksList() {
        return booksList;
    }

    public void setBooksList(List<Book> bookList) {
        this.booksList = bookList;
    }

    public List<Amount> getBooksAmount() {
        return booksAmount;
    }

    public void setBooksAmount(List<Amount> booksAmount) {
        this.booksAmount = booksAmount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public long getProdId() {
        return prodId;
    }

    public void setProdId(long prodId) {
        this.prodId = prodId;
    }
}
