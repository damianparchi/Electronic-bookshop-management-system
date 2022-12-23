import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpServiceService} from "../httpService/http-service.service";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private baseUrl = 'http://localhost:8080';
  private subject = new Subject<any>();
  public get autoRefresh() {
    return this.subject;
  }

  constructor(private http: HttpClient, private httpService: HttpServiceService) { }

  private httpOptions = {
    headers: new HttpHeaders ({'content-type': 'application/json' , token: localStorage?.['token']})
  };

  getUnconfirmedBooks(status: string) {
    return this.httpService.get(this.baseUrl + "/admin/books" + '?status=' + status, this.httpOptions);
  }

  confirmBooks(bookId: number, status: string): Observable<any> {
    return this.httpService.put(this.baseUrl + "/admin/confirmBook/" + bookId + '?' + 'status=' + status, '', this.httpOptions);
  }

  deniedBooks(bookId: number, status: string): Observable<any> {
    return this.httpService.put(this.baseUrl + "/admin/confirmBook/" + bookId + '?' + 'status=' + status, '', this.httpOptions);
  }

  getCheckouts(): Observable<any> {
    return this.httpService.get(this.baseUrl + "/admin/checkouts/", {});
  }
  private _autoRefresh$ = new Subject();

  get autoRefresh$() {
    return this._autoRefresh$;
  }



}
