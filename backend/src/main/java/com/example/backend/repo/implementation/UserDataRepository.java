package com.example.backend.repo.implementation;

import com.example.backend.entity.User;
import com.example.backend.entity.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDataRepository extends JpaRepository<UserData, Long> {

    @Query(value = "select * from user_data where user_id=?", nativeQuery = true)
    List<UserData> findAddressByUserId(Long userdataId);

}
