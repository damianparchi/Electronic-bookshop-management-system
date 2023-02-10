package com.example.backend.response;

import com.example.backend.entity.UserData;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserDataResponse {
    UserData userData;
    private Object obj;

    public Object getObj() {
        return obj;
    }
    public void setObj(Object obj) {
        this.obj = obj;
    }

    int statusCode;
    String response;
    List<UserData> userDataList;

    public UserData getUserData() {
        return userData;
    }

    public void setUserData(UserData userData) {
        this.userData = userData;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public List<UserData> getUserDataList() {
        return userDataList;
    }

    public void setUserDataList(List<UserData> userDataList) {
        this.userDataList = userDataList;
    }

    public UserDataResponse() {

    }

    public UserDataResponse(String response, Object obj) {
        super();
        this.obj = obj;
        this.response = response;
    }

    public UserDataResponse(int statusCode, String response) {
        super();
        this.statusCode = statusCode;
        this.response = response;
    }
}
