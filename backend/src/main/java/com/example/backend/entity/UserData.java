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

    private String imie;
    private String nazwisko;
    private String nrTel;
    private String Miasto;
    private String Ulica;
    private String nrMieszkaniaDomu;
    private String kodPocztowy;

    public UserData(UserDataDTO userDataDTO) {
        this.imie = userDataDTO.getImie();
        this.nazwisko = userDataDTO.getNazwisko();
        this.nrTel = userDataDTO.getNrTel();
        this.Miasto = userDataDTO.getMiasto();
        this.Ulica = userDataDTO.getUlica();
        this.nrMieszkaniaDomu = userDataDTO.getNrMieszkaniaDomu();
        this.kodPocztowy = userDataDTO.getKodPocztowy();

    }

    public UserData() {

    }
}
