package com.example.backend.dto;

import lombok.Data;

@Data
public class UpdateUserDataDTO {

    private long userdataId;
    private String name;
    private String surname;
    private String mobilePhone;
    private String city;
    private String street;
    private String houseApartmentNr;
    private String postcode;
    private String province;
    private String cardNumber;
    private String expirationDate;
    private String cvvnumber;

}
