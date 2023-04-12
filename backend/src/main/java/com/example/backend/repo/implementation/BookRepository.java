package com.example.backend.repo.implementation;

import org.springframework.data.repository.CrudRepository;
import com.example.backend.entity.Book;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Long> {
    List<Book> findByStatus(String status);

    Book findByBookId(Long bookId);
}
