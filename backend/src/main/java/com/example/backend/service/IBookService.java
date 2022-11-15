package com.example.backend.service;

import com.example.backend.dto.BookDto;
import com.example.backend.dto.BookEditDTO;
import com.example.backend.entity.Book;
import io.swagger.models.auth.In;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface IBookService {

    boolean addBooks(String bookCover, BookDto information, String token);

    List<Book> getBookInfo(String token);

    boolean deleteBook(long bookId, String token);

    boolean editBook(long bookId, BookEditDTO information, String token);

    List<Book> getAllConfirmedBooks();
    Page<Book> getBookConfirm(Optional<String> searchByBookName, Optional<Integer> page, Optional<String> sortBy, Optional<String> order);
    boolean editBookStatus(long bookId, String status, String token);
}
