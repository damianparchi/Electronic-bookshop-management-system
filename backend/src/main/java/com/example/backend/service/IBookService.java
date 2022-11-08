package com.example.backend.service;

import com.example.backend.dto.BookDto;
import com.example.backend.entity.Book;
import java.util.List;

public interface IBookService {

    boolean addBooks(String imageName, BookDto information, String token);


    List<Book> getBookInfo(String token);

}
