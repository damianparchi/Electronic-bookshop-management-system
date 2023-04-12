package com.example.backend.exception;

public class AdminException extends RuntimeException{
    private String message;

    public AdminException(String message) {
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
