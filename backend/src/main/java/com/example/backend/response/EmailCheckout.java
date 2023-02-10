package com.example.backend.response;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class EmailCheckout {
    private String email;
    private String temat;
    private String message;

}
