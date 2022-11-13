package com.example.backend.exception;

public class BookException extends RuntimeException {

    private String message;

    public BookException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
