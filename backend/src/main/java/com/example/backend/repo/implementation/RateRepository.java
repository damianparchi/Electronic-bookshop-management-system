package com.example.backend.repo.implementation;

import com.example.backend.entity.Rate;
import com.example.backend.entity.User;
import org.hibernate.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RateRepository extends JpaRepository<Rate, Long> {
    @Query("from Rate where book_id=:id ")
    List<Rate> getreviews(Long id);

    @Query( value = "select * from Rate", nativeQuery = true)
    List<Rate> getreviewss();

    @Query("from Rate where book_id=:id and username=:username ")
    Rate getBookReview(Long id , String username);



}