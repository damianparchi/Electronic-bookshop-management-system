package com.example.backend.exception;

public class BookisExisting extends RuntimeException{
    private String message;
    public String getMessage(){
        return message;
    }

    public void setMessage(String message){
        this.message = message;
    }

    public BookisExisting(String message){
        this.message = message;
    }
}
