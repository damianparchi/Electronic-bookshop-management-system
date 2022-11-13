package com.example.backend.service;
import com.example.backend.entity.Book;

import java.util.List;

public interface AdminService {

    boolean confirmBook(long bookId, String status, String token);

    List<Book> getBooksStatus(String status);
}
