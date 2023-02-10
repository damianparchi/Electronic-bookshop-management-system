package com.example.backend.repo.implementation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Book;

import java.util.List;

@Repository
public interface BookImplementation extends JpaRepository<Book, Long> {

    @Query( value = "select * from Book where user_id=:id", nativeQuery = true)
    List<Book> getAllBooks(long id);
    @Query("from Book where bookName=:name")
    Book fetchbyBookName(String name);

    @Query("from Book where bookId=:id")
    Book fetchbyId(Long id);

    @Modifying
    @Query("delete from Book where bookId=:id")
    void deleteByBookId(long id);

    @Query( value = "select * from Book where status='Zatwierdzono...'", nativeQuery = true)
    List<Book> getAllConfirmedBooks();

    @Query( value = "select * from Book where book_name like %?1% AND status='Zatwierdzono...'", nativeQuery = true)
    Page<Book> findByBookName(String name, Pageable pageable);

    @Modifying
    @Query("update from Book set status=:status where book_id=:id")
    int updateBookStatusByBookId(String status,long id);

    @Query( value = "select avg(rate) from Rate where book_id=:id and rate>0.1", nativeQuery = true)
    double averageRate(long id);

    @Query( value = "select avg(rate) from Rate where book_id=:id", nativeQuery = true)
    double averageRatee();

}
