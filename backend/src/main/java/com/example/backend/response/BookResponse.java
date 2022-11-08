package com.example.backend.response;

import org.springframework.stereotype.Component;
import com.example.backend.entity.Book;
import java.util.List;

@Component
public class BookResponse {
    private Object object;

    public Object getObject() {
        return object;
    }

    public void setObj(Object object) {
        this.object = object;
    }

    int statusCode;
    String response;

    public BookResponse() {

    }
    public BookResponse(String response, Object object) {
        super();
        this.object = object;
        this.response = response;
    }
    public BookResponse(int statusCode, String response) {
        super();
        this.statusCode = statusCode;
        this.response = response;
    }

}
