package com.example.backend.response;

import org.springframework.stereotype.Component;

@Component
public class EmailResponse {
    public String formMessage(String url, String token) {
        return url + "/" + token;
    }
}
