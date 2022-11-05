import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl="http://localhost:8080/register";

  constructor(private httpClient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
  };

  public signUp(data: any) {
    console.log(data);
    return this.httpClient.post(`${this.baseUrl}`, data);
  }
}
