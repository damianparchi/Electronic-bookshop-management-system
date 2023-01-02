import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl="http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  public signUp(data: any) {
    console.log(data);
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }

  public getUserInfo(token: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/userinfo/${token}`, {headers: new HttpHeaders({token: localStorage?.['token']})});
  }

  public logIn(data: any) {
    console.log(data);
    return this.httpClient.post(`${this.baseUrl}/user/login`, data);
    
  }

  public addUserData(userData: any) {
    return this.httpClient.post(`${this.baseUrl}/userdata/add`, userData, {headers: new HttpHeaders({token: localStorage?.['token']})});
  }

  public getUserData(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/userdata/info`, {headers: new HttpHeaders({token: localStorage?.['token']})});
  }

  public updateUserData(userData: any) {
    return this.httpClient.put(`${this.baseUrl}/userdata/update`, userData, {headers: new HttpHeaders({token: localStorage?.['token']})});
  }

  getCheckoutHistory(token: string): Observable<any> {
    console.log('order status url');
    console.log(this.httpClient.get(`${this.baseUrl}/userbooks/${token}`, {headers: new HttpHeaders({token: localStorage?.['token']})}));
    return this.httpClient.get(`${this.baseUrl}/userbooks/${token}`, {headers: new HttpHeaders({token: localStorage?.['token']})});
  }

}
