package com.example.backend.dto;

import lombok.Data;

@Data
public class UpdateUserDataDTO {

    private long userdataId;
    private String imie;
    private String nazwisko;
    private String nrTel;
    private String Miasto;
    private String Ulica;
    private String nrMieszkaniaDomu;
    private String kodPocztowy;

}
