package com.example.backend.entity;

import com.example.backend.dto.UserDataDTO;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class UserData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userdataId;
    private String name;
    private String surname;
    private String mobilePhone;
    private String City;
    private String Street;
    private String houseApartmentNr;
    private String postcode;
    private String province;
    private String cardNumber;
    private String expirationDate;
    private String cvvnumber;

    public UserData(UserDataDTO userDataDTO) {
        this.name = userDataDTO.getName();
        this.surname = userDataDTO.getSurname();
        this.mobilePhone = userDataDTO.getMobilePhone();
        this.City = userDataDTO.getCity();
        this.Street = userDataDTO.getStreet();
        this.houseApartmentNr = userDataDTO.getHouseApartmentNr();
        this.postcode = userDataDTO.getPostcode();
        this.province = userDataDTO.getProvince();
        this.cardNumber = userDataDTO.getCardNumber();
        this.expirationDate = userDataDTO.getExpirationDate();
        this.cvvnumber = userDataDTO.getCvvnumber();


    }

    public UserData() {

    }
}
