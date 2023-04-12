package com.example.backend.dto;

import lombok.Data;

@Data
public class BasketDTO {

    private Long amountId;
    private Long amountOfBook;
    private Double cost;

    public Long getAmountId() {
        return amountId;
    }

    public void setAmountId(Long amountId) {
        this.amountId = amountId;
    }

    public Long getAmountOfBook() {
        return amountOfBook;
    }

    public void setAmountOfBook(Long amountOfBook) {
        this.amountOfBook = amountOfBook;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }
}
