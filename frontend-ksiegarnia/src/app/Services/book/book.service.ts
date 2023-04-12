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

  private _autoRefresh$ = new Subject();

  get autoRefresh$() {
    return this._autoRefresh$;
  }

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
    // console.log('get service');
    return this.searchBookData.asObservable();
  }

  public ratingandreview(bookId: number, data: any , token: any) {
    console.log('ratingandreview service method bookId :', bookId);
    console.log('ratingandreview service method rate& review dto :', data);
    console.log('token to give rate:', token);

    return this.http.put(`${this.baseUrl}/books/ratingreview?bookId=${bookId}`, data, {headers: new HttpHeaders({token: localStorage?.['token']})})

  }

  public getRate(bookId: number) {
    console.log('get review url:', `?bookId=${bookId}`);
    return this.http.get(`${this.baseUrl}/books/ratingreview?bookId=${bookId}`, {headers: new HttpHeaders({'content-type': 'application/json'})});
  }
  public getRateee(bookId: number) {
    console.log('get review url:', `?bookId=${bookId}`);
    return this.http.get(`${this.baseUrl}/books/getratereviewsbyid?bookId=${bookId}`, {headers: new HttpHeaders({'content-type': 'application/json'})});
  }

  public getRatee() {
    return this.http.get(`${this.baseUrl}/books/confirmedusers`, {headers: new HttpHeaders({'content-type': 'application/json'})});
  }

  public getRateByBookId(bookId: any): Observable<any> {

    console.log( `{$this.baseUrl}/books/avgrate?bookId=${bookId}`);
    return this.http.get(`${this.baseUrl}/books/averageRating?bookId=${bookId}`,
      {}
    );
  }

  public getALlRates(): Observable<any> {
    return this.http.get(`${this.baseUrl}/books/getratereviews`,
      {}
    );
  }



  public getOneBook(bookId: any, token: any) {
    return this.http.get(`${this.baseUrl}/books/getbook/${bookId}`,
      {headers: new HttpHeaders({token})});
  }

  public getOneBookById(bookId: any) {
    return this.http.get(`${this.baseUrl}/books/getbook/${bookId}`, {headers: new HttpHeaders({'content-type': 'application/json'})});
  }





}
