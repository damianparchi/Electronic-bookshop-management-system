package com.example.backend.repo.implementation;


import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<User, Long> {

    @Query( value = "select * from USER where user_id = :user_id", nativeQuery = true)
    User getUserById( long user_id);
}
