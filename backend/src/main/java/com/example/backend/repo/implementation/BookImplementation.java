package com.example.backend.repo.implementation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Book;

import java.util.List;

@Repository
public interface BookImplementation extends JpaRepository<Book, Long> {

    @Query( value = "select * from Book where user_id=:id", nativeQuery = true)
    List<Book> getAllBooks(long id);
    @Query("from Book where book_name=:name")
    Book fetchbyBookName(String name);
}
