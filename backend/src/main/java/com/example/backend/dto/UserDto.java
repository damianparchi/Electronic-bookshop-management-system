package com.example.backend.dto;

import lombok.Data;

@Data
public class UserDto {
    private String username;
    private String email;
    private String password;
    private Long mobileNumber;
    private String role;
}
