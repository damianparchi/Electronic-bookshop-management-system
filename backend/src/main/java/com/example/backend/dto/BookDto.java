package com.example.backend.dto;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class BookDto {
    private String bookName;
    private Long quantityOfBooks;
    private Double cost;
    private String author;
    private String image;
    private String bookDesc;
}
