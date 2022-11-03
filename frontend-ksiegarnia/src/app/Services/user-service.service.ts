import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl="http://localhost:8080/register";

  constructor(private httpClient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
  };

  registerUser(user: User): Observable<Object> {
    console.log(user);
    return this.httpClient.post(`${this.baseUrl}`, user);
  }
}
