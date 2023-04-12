package com.example.backend.implementation;

import com.example.backend.entity.Book;
import com.example.backend.entity.User;
import com.example.backend.exception.AdminException;
import com.example.backend.exception.BookException;
import com.example.backend.repo.implementation.BookRepository;
import com.example.backend.repo.implementation.UsersRepository;
import com.example.backend.service.AdminService;
import com.example.backend.util.JwtGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImplementation implements AdminService {

    @Autowired
    JwtGenerator generator;

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    BookRepository bookRepository;

    @Override
    public boolean confirmBook(long bookId, String status, String token) {
        User user;
        long userId = generator.parseJWT(token);
        user = usersRepository.getUserById(userId);

        if(user!=null) {
            Book book = bookRepository.findByBookId(bookId);
            if(book != null) {
                book.setStatus(status);
                bookRepository.save(book);
                return true;
            } else {
                throw new BookException("Nie znaleziono ksiazki");
            }
        } else {
            throw new AdminException("Nie znaleziono admina");
        }
    }

    @Override
    public List<Book> getBooksStatus(String status) {
        return bookRepository.findByStatus(status);
    }
}
