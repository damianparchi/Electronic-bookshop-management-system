package com.example.backend.service;

import com.example.backend.dto.BookDto;
import com.example.backend.dto.BookEditDTO;
import com.example.backend.entity.Book;
import java.util.List;

public interface IBookService {

    boolean addBooks(String bookCover, BookDto information, String token);


    List<Book> getBookInfo(String token);

    boolean deleteBook(long bookId, String token);

    boolean editBook(long bookId, BookEditDTO information, String token);

}
