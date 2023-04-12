package com.example.backend.repo.implementation;

import com.example.backend.entity.Book;
import java.util.List;

public interface IBook {
    Book save(Book bookinformation);

    List<Book> getUsers();
}
