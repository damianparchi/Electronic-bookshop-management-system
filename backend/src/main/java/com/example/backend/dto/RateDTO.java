package com.example.backend.dto;

import lombok.Data;

@Data
public class RateDTO {
    private Integer rate;
    private String comment;
    private long bookId;
}
