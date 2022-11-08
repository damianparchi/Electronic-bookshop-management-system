package com.example.backend.controller;

import com.example.backend.dto.BookDto;
import com.example.backend.service.IBookService;
import com.example.backend.response.BookResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.entity.Book;

import java.util.List;

@RestController
@CrossOrigin
public class BookController {

    @Autowired
    IBookService iBookService;

    @PostMapping("books/{imageName}")
    public ResponseEntity<BookResponse> addBook(@PathVariable String imageName, @RequestBody BookDto information,@RequestHeader("token") String token) {

        boolean res=iBookService.addBooks(imageName,information,token);
        if(res)
            return ResponseEntity.status(HttpStatus.CREATED).body(new BookResponse(200, "Książka dodana pomyślnie!"));
        else
            return ResponseEntity.status(HttpStatus.CREATED).body(new BookResponse(400, "Coś się nie zgadza! "));
    }

    @GetMapping("books/")
    public ResponseEntity<BookResponse> getBooks(@RequestHeader("token") String token) {
        List<Book> books = iBookService.getBookInfo(token);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new BookResponse("szczegoly ksiazki: ", books));
    }

}
