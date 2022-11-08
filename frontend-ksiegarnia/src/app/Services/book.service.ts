import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
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

  addBook(book: any, imageName: string): Observable<any> {
    return this.httpService
      .post(`${this.baseUrl}/books/${imageName}`, book, {headers: new HttpHeaders({token: localStorage?.['token']})})
  }

}
