import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpServiceService} from "../httpService/http-service.service";
import {Observable, Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private httpService: HttpServiceService) { }


  addToBasket(bookId: any): Observable<any> {
    return this.httpService
      .post(`${this.baseUrl}/ksiegarnia/basket/addBookToBasket/${bookId}`, {}, {headers: new HttpHeaders({token: localStorage?.['token']})})
  }

  getBooksInBasket(){
    return this.httpService
      .get(`${this.baseUrl}/ksiegarnia/basket/getBooksinBasket`, {headers: new HttpHeaders({token: localStorage?.['token']})})
  }

  getBasketItemsCount(){
    return this.httpService
      .get(`${this.baseUrl}/ksiegarnia/basket/bookSumUp`, {headers: new HttpHeaders({token: localStorage?.['token']})})
  }

  removeItemFromBasket(bookId: number){
    return this.httpService.delete(`${this.baseUrl}/ksiegarnia/basket/deleteBooksFromBasket/${bookId}`, {headers: new HttpHeaders({token: localStorage?.['token']})})

  }

  minusBooks(bookId, Basketinfo) {
    return this.httpService
      .put(`${this.baseUrl}/ksiegarnia/basket/minusBook?bookId=${bookId}`, Basketinfo , {headers: new HttpHeaders({token: localStorage?.['token']})})
  }

  plusBooks(bookId, Basketinfo) {
    console.log('cart details are ', Basketinfo);
    return this.httpService
      .put(`${this.baseUrl}/ksiegarnia/basket/plusBook?bookId=${bookId}`, Basketinfo , {headers: new HttpHeaders({token: localStorage?.['token']})})
  }
}
