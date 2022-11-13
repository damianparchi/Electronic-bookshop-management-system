import { Injectable } from '@angular/core';
import {Observable, Subject, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpServiceService} from './http-service.service'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private httpService: HttpServiceService) { }

  getallBooks() {
    console.log('wszystkie ksiazki');
    return this.httpService.get(`${this.baseUrl}/books/`, {headers: new HttpHeaders({token: localStorage?.['token']})});
  }

  addBook(book: any, bookCover: string): Observable<any> {
    return this.httpService
      .post(`${this.baseUrl}/books/${bookCover}`, book, {headers: new HttpHeaders({token: localStorage?.['token']})})
  }

  deleteBook(bookId: any): Observable<any> {
    return this.httpService
      .delete(`${this.baseUrl}/books/${bookId}`, {headers: new HttpHeaders({token: localStorage?.['token']})});
  }

  updateBook(bookId: any, book: any): Observable<any> {
    return this.httpService
      .put(`${this.baseUrl}/books/${bookId}`, book, {headers: new HttpHeaders({token: localStorage?.['token']})});
  }

  private searchBookData = new Subject<any>();

  getSearchBookData(): Observable<any> {
    return this.searchBookData.asObservable();
  }

  public getAllConfirmedBooks(page: any, sortby ?: string, orderBy ?: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/books/confirmed`);
  }

}
