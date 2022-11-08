package com.example.backend.response;

public class UserDetailResponse {
    private String token;
    private int statuscode;
    private Object obj;

    public UserDetailResponse(String token, int statuscode, Object obj){
        this.token = token;
        this.statuscode = statuscode;
        this.obj = obj;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getStatuscode(int statuscode) {
        return statuscode;
    }

    public void setStatuscode(int statuscode){
        this.statuscode = statuscode;
    }

    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }
}
