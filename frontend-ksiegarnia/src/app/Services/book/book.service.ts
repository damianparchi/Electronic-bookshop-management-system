import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpServiceService} from '../httpService/http-service.service'

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

  sendAgain(bookId: any, status: any): Observable<any> {
    console.log('url ', `${this.baseUrl}/books/${bookId}/${status}`);

    return this.httpService
      .put(`${this.baseUrl}/books/${bookId}/${status}`, ' ', {headers: new HttpHeaders({token: localStorage?.['token']})})
  }

  public getAllConfirmedBooks(page: number, sortby ?: string, orderBy ?: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/books/confirmed?page=${page}&order=${orderBy}&sortBy=${sortby}`);
  }

  private searchBookData = new Subject<any>();

  setSearchBookData(message: any) {
    console.log('set service', message);
    return this.searchBookData.next({ books: message });
  }
  getSearchBookData(): Observable<any> {
    console.log('get service');
    return this.searchBookData.asObservable();
  }

}
