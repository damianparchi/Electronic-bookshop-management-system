package com.example.backend.dto;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Data
@Component
public class BookEditDTO {

    private String bookName;
    private Long quantityOfBooks;
    private Double cost;
    private String author;
    private String cover;
    private String bookDesc;
    private LocalDateTime updatedAt;
}
