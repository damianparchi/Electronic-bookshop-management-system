package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="userregister")
public class User {

    @Id
    private String  userId;
    private String  email;
    private String  password;
    private String  cpassword;

}
