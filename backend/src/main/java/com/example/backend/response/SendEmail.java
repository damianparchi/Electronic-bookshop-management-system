package com.example.backend.response;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class SendEmail {
    private String email;
    private String subject;
    private String body;
}
