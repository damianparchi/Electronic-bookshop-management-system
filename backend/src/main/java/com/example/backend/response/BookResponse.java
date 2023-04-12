package com.example.backend.response;

import org.springframework.stereotype.Component;
import com.example.backend.entity.Book;
import java.util.List;

@Component
public class BookResponse {
    Book book;

    private Object obj;
    double rate;


    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }

    int statusCode;
    String response;
    List<Book> bookList;

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
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

    public List<Book> getBookList() {
        return bookList;
    }

    public void setBookList(List<Book> bookList) {
        this.bookList = bookList;
    }

    public BookResponse() {

    }

    public BookResponse(String response, Object obj) {
        super();
        this.obj = obj;

        this.response = response;
    }

    public BookResponse(int statusCode, String response) {
        super();
        this.statusCode = statusCode;
        this.response = response;
    }

}
