package com.example.backend.email;

public interface EmailSender {
    default void send(String to, String email){

    }
}
