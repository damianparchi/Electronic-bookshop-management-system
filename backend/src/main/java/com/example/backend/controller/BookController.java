package com.example.backend.controller;

import com.example.backend.dto.BookDto;
import com.example.backend.dto.BookEditDTO;
import com.example.backend.service.IBookService;
import com.example.backend.response.BookResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.entity.Book;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class BookController {

    @Autowired
    IBookService iBookService;

    @PostMapping("books/{bookCover}")
    public ResponseEntity<BookResponse> addBook(@PathVariable String bookCover, @RequestBody BookDto information,@RequestHeader("token") String token) {

        boolean res=iBookService.addBooks(bookCover,information,token);
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

    @DeleteMapping("books/{bookId}")
    public ResponseEntity<BookResponse> deleteBook(@PathVariable long bookId, @RequestHeader("token") String token) {
        boolean odp = iBookService.deleteBook(bookId, token);
        if (odp)
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new BookResponse(202, "Książka usunięta!"));
        return null;
    }

    @PutMapping("books/{bookId}")
    public ResponseEntity<BookResponse> editBook(@PathVariable("bookId") long bookId,@RequestBody BookEditDTO information,@RequestHeader("token") String token){
        boolean res =iBookService.editBook(bookId,information,token);
        if(res)
            return ResponseEntity.status(HttpStatus.CREATED).body(new BookResponse(200, "Książka edytowania pomyślnie!"));
        return null;
    }

    @GetMapping("books/confirmed")
    public ResponseEntity<BookResponse> getAllConfirmedBooks(@RequestParam Optional<String> searchByBooKName, @RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy, @RequestParam Optional<String> order) {
        Page<Book> books = iBookService.getBookConfirm(searchByBooKName, page, sortBy, order);
        if (books != null)
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new BookResponse("Potwierdzone książki", books));
        else
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new BookResponse(400, "Brak potwierdzonych książek"));
    }

    @PutMapping("books/{bookId}/{status}")
    public ResponseEntity<BookResponse> editBookStatus(@PathVariable long bookId, @PathVariable String status,  @RequestHeader("token") String token) {
        boolean res = iBookService.editBookStatus(bookId, status, token);
        if (res)
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(new BookResponse(202, "Status został zmieniony"));
        else
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(new BookResponse(400, "Status nie został zmieniony"));
    }



}
