import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://localhost:8080';

  checkout(bookId: any, userdataId: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/ksiegarnia/checkout?userdataId=${userdataId}&bookId=${bookId}`, {}, {headers: new HttpHeaders({token: localStorage?.['token']})} )
  }

}
