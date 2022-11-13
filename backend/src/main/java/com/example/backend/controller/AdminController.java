package com.example.backend.controller;

import com.example.backend.response.BookResponse;
import com.example.backend.response.Response;
import com.example.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.entity.Book;

import java.util.List;

@RestController
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PutMapping("admin/confirmBook/{bookId}")
    public ResponseEntity<BookResponse> approveBook(@PathVariable long bookId, @RequestParam String status , @RequestHeader String token) {
        if (adminService.confirmBook(bookId, status, token)) {
            return ResponseEntity.status(HttpStatus.OK).body(new BookResponse("Ksiazka zatwierdzona przez admina.", HttpStatus.ACCEPTED));
        }
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new BookResponse(406, "Niezatwierdzono ksiazki."));
    }

    @GetMapping("/admin/books")
    public ResponseEntity<BookResponse> getBooksStatus(@RequestParam String status) {
        List<Book> books = adminService.getBooksStatus(status);
        return ResponseEntity.status(HttpStatus.OK).body(new BookResponse(status + "Books ", books));
    }

}
