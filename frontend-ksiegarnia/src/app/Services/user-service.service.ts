import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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

  public logIn(data: any) {
    console.log(data);
    return this.httpClient.post(`${this.baseUrl}/user/login`, data);
  }


}
