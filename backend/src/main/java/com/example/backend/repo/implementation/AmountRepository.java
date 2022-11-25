package com.example.backend.repo.implementation;

import com.example.backend.entity.Amount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmountRepository extends JpaRepository<Amount, Long> {

}
